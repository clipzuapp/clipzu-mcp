import { readdirSync, readFileSync, existsSync, lstatSync } from 'node:fs'
import { resolve, dirname, relative, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const expected = ['clipzu-best-practices', 'clipzu-design', 'clipzu-motion', 'clipzu-render', 'clipzu-timeline']
const errors = [], files = []
function walk(path) {
  for (const item of readdirSync(path, { withFileTypes: true })) {
    const target = resolve(path, item.name)
    if (item.name === '.git') { if (path !== root) errors.push(`Nested repository: ${relative(root, target)}`); continue }
    if (item.name === 'node_modules') continue
    if (lstatSync(target).isSymbolicLink()) { errors.push(`Distribution must not depend on symlinks: ${relative(root, target)}`); continue }
    if (item.isDirectory()) walk(target)
    else files.push(target)
  }
}
walk(root)
const skills = files.filter(path => path.endsWith('/SKILL.md') || path.endsWith('\\SKILL.md'))
const names = []
for (const path of skills) {
  const text = readFileSync(path, 'utf8'), match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) { errors.push(`Missing frontmatter: ${relative(root, path)}`); continue }
  const fields = Object.fromEntries(match[1].split(/\r?\n/).map(line => { const at = line.indexOf(':'); return [line.slice(0, at), line.slice(at + 1).trim()] }))
  const name = fields.name
  names.push(name)
  if (!expected.includes(name) || name !== dirname(path).split(/[\\/]/).at(-1)) errors.push(`Invalid skill name: ${relative(root, path)}`)
  if (!fields.description || fields.description.length > 1024) errors.push(`Invalid description: ${name}`)
  if (fields.license !== 'MIT' || !existsSync(resolve(dirname(path), 'LICENSE'))) errors.push(`Missing installed license notice: ${name}`)
  if (Object.keys(fields).some(key => !['name', 'description', 'license'].includes(key))) errors.push(`Unexpected frontmatter field: ${name}`)
  if (text.split(/\r?\n/).length > 120) errors.push(`Entrypoint should stay focused: ${name}`)
  if (/\b(?:v\d+|vNext)\b|\bversion\s*:/i.test(text)) errors.push(`Skill generation/version contamination: ${name}`)
}
if (JSON.stringify(names.sort()) !== JSON.stringify(expected)) errors.push('Expected exactly five canonical skill definitions')
for (const path of files.filter(path => /\.(md|json|txt)$/.test(path) || path.endsWith('LICENSE'))) {
  const text = readFileSync(path, 'utf8'), label = relative(root, path)
  if (/[A-Z]:[\\/]app[\\/]|[\\/]Users[\\/]|\/opt\/|\.ppk\b|BEGIN [A-Z ]*PRIVATE KEY|X-Amz-Signature|clipzu_agent_[A-Za-z0-9_-]{12,}|Bearer\s+[A-Za-z0-9._-]{16,}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/i.test(text)) errors.push(`Possible private path/credential: ${label}`)
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const link = match[1]
    if (/^[a-z]+:\/\//i.test(link) || link.startsWith('#')) continue
    const target = resolve(dirname(path), decodeURIComponent(link.split('#')[0]))
    const rel = relative(root, target)
    if (isAbsolute(rel) || rel.startsWith('..') || !existsSync(target)) errors.push(`Broken/outside link in ${label}: ${link}`)
    if (path.includes(`${resolve(root, 'skills')}`)) {
      const skillRoot = resolve(root, 'skills', relative(resolve(root, 'skills'), path).split(/[\\/]/)[0])
      const local = relative(skillRoot, target)
      if (isAbsolute(local) || local.startsWith('..')) errors.push(`Installed skill depends on another folder: ${label}: ${link}`)
    }
  }
}
if (errors.length) { for (const error of errors) console.error(error); process.exitCode = 1 }
else console.log(JSON.stringify({ skills: names.length, files: files.length, localLinksValid: true, selfContainedSkills: true, structuralPrivacyChecksPassed: true }))
