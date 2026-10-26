# Clipzu MCP & Agent Skills

Original design, editing, motion and verification skills for agents connected to Clipzu's hosted MCP service. Public distribution: [clipzuapp/clipzu-mcp](https://github.com/clipzuapp/clipzu-mcp). **MCP access is currently private to approved testers. Installing these files does not grant account access or enable a public rollout.**

The editing/rendering backend stays hosted by Clipzu at `https://clipzu.com/mcp`. This package contains instructions and examples, not a local MCP server, renderer or copy of the application. You need your own authorized Clipzu account, ready owned media and a compatible client.

**Client-neutral:** connect with any MCP client that supports Streamable HTTP and Clipzu's account authorization. Clients with Agent Skills support can load the five skills; other MCP clients can use the tools and follow the documentation without installing skills. Codex and Claude Code setup examples are optional conveniences. Neither product is a package dependency or a requirement for using Clipzu MCP.

## Install

Skill installation is optional for the MCP connection itself. From your agent's project directory, install the public package and choose your supported client and the five Clipzu skills:

```sh
npx skills add clipzuapp/clipzu-mcp
```

For an optional noninteractive client example, use `npx skills add clipzuapp/clipzu-mcp --agent codex --skill '*' --copy --yes`; choose the agent name supported by your client instead of `codex`. These are project installs. `--copy` retains each skill's references independently of the downloaded source. Manual installation from GitHub's downloaded archive is also supported; see [client setup](examples/mcp-client-setup.md).

The public repository contains this distribution only. No private Clipzu application checkout is required.

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
