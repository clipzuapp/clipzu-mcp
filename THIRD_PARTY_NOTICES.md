# Research and attribution

This package's instructions, examples and checks were written for Clipzu. No third-party skill text, code, bundled artwork, logos or animation assets are redistributed. The MIT license in this folder covers this new package, not Clipzu's hosted application or any upstream project. Product names identify compatibility/reference sources; no affiliation or endorsement is implied.

Research was inspected on 26 October 2026 at these source snapshots:

| Source | Inspected structure/content | License finding and treatment |
|---|---|---|
| [Claude Design Skills](https://github.com/freshtechbro/claudedesignskills/tree/1da73febff0c3e1dfefc07f8a5ef8f7d1dfdb6cd/.claude/skills) | `modern-web-design/SKILL.md`, `motion-framer/SKILL.md`, topic references and directory organization | Root [MIT license](https://github.com/freshtechbro/claudedesignskills/blob/1da73febff0c3e1dfefc07f8a5ef8f7d1dfdb6cd/LICENSE), copyright 2025 Claude Skills Project. Nested material can carry separate terms. No text/code/assets copied. |
| [Remotion Agent Skills](https://github.com/remotion-dev/skills/tree/6c67adcd9cdbe6eb84d76342da89b225f9161cb2) | Router, video-layout guidance, markup timing, transitions and audio references | No LICENSE/COPYING/NOTICE file found in the inspected tree and no SPDX license in repository metadata. No redistribution permission inferred; no upstream material copied. |
| [Agent Skills specification](https://agentskills.io/specification) | Name/description frontmatter, skill directories, supporting references and progressive loading | Used as an interoperability specification; no reference implementation bundled. |
| [Skills CLI](https://github.com/vercel-labs/skills/tree/a80e4c9d12d607631249d4d7d059f835d4b2f13a) | Local-source installation, agent selection and copying | MIT repository; invoked as an optional external installer, not redistributed or made a runtime dependency. |

Useful concepts were re-expressed as original Clipzu guidance: commit to an art direction; create a clear reading order; use spacing and limited palette roles; schedule motion on the real frame grid; coordinate entrances and scene overlaps; distinguish source trim from placement; inspect preview and output; load detailed references only when needed. These are general design/workflow principles, implemented here through Clipzu's actual operations.

Excluded upstream mechanisms include React components, spring engines, custom Bézier code, WebGL/3D integrations, CSS animation APIs, local Studio/renderer setup and effect packages. They do not become Clipzu capabilities by being mentioned in a reference.

Official compatibility sources: [Codex MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli), [Codex skills](https://learn.chatgpt.com/docs/build-skills), [Claude Code MCP](https://code.claude.com/docs/en/mcp), [Claude Code skills](https://code.claude.com/docs/en/skills), [Remotion's skills overview](https://www.remotion.dev/docs/ai/skills) and [Skills CLI documentation](https://skills.sh/docs/cli). Recheck client documentation when flags or callback behavior change.
