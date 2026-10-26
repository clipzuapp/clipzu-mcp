# Clipzu MCP & Agent Skills

Original design, editing, motion and verification skills for agents connected to Clipzu's hosted MCP service. **MCP access is currently private to approved testers. Installing these files does not grant account access or enable a public rollout.**

The editing/rendering backend stays hosted by Clipzu at `https://clipzu.com/mcp`. This package contains instructions and examples, not a local MCP server, renderer or copy of the application. You need your own authorized Clipzu account, ready owned media and a compatible client.

## Install

From your agent's project directory, point the Skills CLI at the downloaded standalone folder:

```sh
npx skills add ../clipzu-mcp --agent codex --skill '*' --copy --yes
```

For Claude Code replace `codex` with `claude-code`. These are project installs; omit `--yes` if you want interactive review. `--copy` retains each skill's references without depending on the downloaded folder. The relative source path is an example: use the actual location of your extracted package. The installer is optional; manual installation is documented in [client setup](examples/mcp-client-setup.md).

After a separate public repository is published, the same verified source syntax supports `npx skills add OWNER/clipzu-mcp --agent codex --skill '*' --copy --yes`. **OWNER is an explicit placeholder, not an existing repository or promised organization.** No public remote has been created by this package.

Next, follow [MCP client setup](examples/mcp-client-setup.md) to connect and authorize. A pre-registered client ID and matching callback must be supplied by Clipzu for OAuth. Private membership is enforced independently. There is no bundled credential, shared master token or automatic client registration.

## Five focused skills

| Skill | Responsibility |
|---|---|
| [clipzu-best-practices](skills/clipzu-best-practices/SKILL.md) | Discover capabilities, inspect work, plan, coordinate and report honestly |
| [clipzu-design](skills/clipzu-design/SKILL.md) | Direction, type hierarchy, spacing, palette, composition and critique |
| [clipzu-motion](skills/clipzu-motion/SKILL.md) | Story beats, supported easing, stagger, purposeful holds and handoffs |
| [clipzu-timeline](skills/clipzu-timeline/SKILL.md) | Exact commands, owned media, tracks, trims, transactions and revisions |
| [clipzu-render](skills/clipzu-render/SKILL.md) | Actual editor/output inspection, worker jobs, parity and sound |

Start with the first skill; load supporting references when the task needs them. Install one canonical Clipzu set. If an older Clipzu skill set is already installed, review its location and replace that installation rather than loading competing instructions; do not delete unrelated skills or alter backend migration/revision history.

## Use

“Use Clipzu to plan a six-second cinema announcement with a clear title hierarchy and restrained motion. Inspect my uploaded assets, explain which treatments they support, then create an editable layered project. Keep the title readable, develop the visual rhythm beyond its entrance, and verify the saved work. Export one MP4 only when authorized.”

See [editing workflows](examples/editing-workflows.md), [motion briefs](examples/motion-graphics-prompts.md), [capabilities](docs/capabilities.md), [authentication](docs/authentication.md) and [troubleshooting](docs/troubleshooting.md).

The tools author image/video clips, audio placement and five numeric transform properties using existing presets. They do not author native typography/shapes, procedural expressions, arbitrary effects or a new animation engine. PNG-based title artwork can move as editable clips; it is not native per-letter animation. Connected tools and permissions are authoritative.

## Validation and distribution

Run `node checks/check-package.mjs` for dependency-free structural/link/privacy checks. [Validation evidence](docs/validation.md) distinguishes local installation, actual native-agent editing, real worker output and client paths that have only documentation/CLI checks.

Everything needed for the installed instructions is inside each skill folder. No private monorepo paths, production infrastructure access or local Clipzu rendering installation is needed. Supported media inspection tools are optional for agents that verify downloaded output locally.

The new package is MIT licensed. Individual skill folders retain the license notice when installed separately. [Third-party notices](THIRD_PARTY_NOTICES.md) identify research sources and license findings. No upstream skill text, code, assets, logos or renderer dependencies are bundled.
