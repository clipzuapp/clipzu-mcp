# Client setup

Skill installation and account authorization are separate steps. Use a supported current client and your own approved Clipzu account. The hosted service stays at `https://clipzu.com/mcp`; there is no local Clipzu server to launch.

## Install from a local standalone folder

In the project where you will run the agent, use the actual path to your extracted package:

```sh
npx skills add ../clipzu-mcp --agent codex --skill '*' --copy --yes
npx skills list --agent codex
```

Choose `claude-code` instead of `codex` for Claude Code, or install for both by listing both agents. `--copy` makes the installed skills independent of the source directory. No global installation is required. The optional installer uses Node/npm; consult its current requirements. Its telemetry can be disabled with `DISABLE_TELEMETRY=1` in the environment.

For manual installation, copy the five complete subdirectories inside `skills/` into your agent project's `.agents/skills/` for Codex or `.claude/skills/` for Claude Code. Retain each `references/` directory. Do not copy this package's whole root as a single skill. Restart or refresh the client and confirm the canonical five names appear. Review same-name personal/managed skills if they take precedence.

For a future published repository, replace the explicit placeholder `OWNER` with the actual publisher and use `npx skills add OWNER/clipzu-mcp --agent codex --skill '*' --copy --yes`. This is a conditional installation pattern, not a live repository claim. No organization or remote has been selected here.

## Codex: OAuth

Clipzu must supply a registered **public** OAuth client ID and matching callback for this client. `CLIPZU_OAUTH_CLIENT_ID` below is a placeholder environment variable containing that non-secret identity, not an access token.

```powershell
codex mcp add clipzu --url https://clipzu.com/mcp --oauth-client-id $env:CLIPZU_OAUTH_CLIENT_ID
codex mcp login clipzu --scopes projects:read,projects:write,media:read,exports:read,exports:write
```

Complete ordinary Clipzu login/consent in the browser. Keep the native callback URL exactly as registered, including its host/path; native loopback port handling is client/provider specific. Do not request a client secret: Clipzu currently uses public clients with PKCE. Confirm scopes in consent and use a read-only call before edits. See [official Codex MCP setup](https://learn.chatgpt.com/docs/extend/mcp?surface=cli).

If Clipzu has instead issued an individual scoped personal agent token, Codex can read it from a private process environment:

```sh
codex mcp add clipzu --url https://clipzu.com/mcp --bearer-token-env-var CLIPZU_AGENT_TOKEN
```

Set the variable through a secure environment facility, not a committed file, literal shell command or agent prompt. This is an alternative to OAuth, not a way around approval. Do not combine conflicting OAuth and personal-token configurations.

## Claude Code: OAuth

Copy the skills as above or use `--agent claude-code`. Obtain a Clipzu-approved client ID and the exact callback URI expected by your installed Claude Code release. Its current documented callback is `http://localhost:PORT/callback`; this differs from a Codex registration using `127.0.0.1`. Do not reuse another client's registration just because the endpoint is the same.

`CLIPZU_OAUTH_CLIENT_ID` and `CLIPZU_CALLBACK_PORT` are explicitly configured placeholder environment variables; the latter must match the registered callback. For PowerShell:

```powershell
claude mcp add --transport http --scope local --client-id $env:CLIPZU_OAUTH_CLIENT_ID --callback-port $env:CLIPZU_CALLBACK_PORT clipzu https://clipzu.com/mcp
```

Open Claude Code, use `/mcp`, and follow authentication. For this public client omit `--client-secret`. Confirm the actual granted scopes; read-only consent does not authorize editing/export. Scope selection and callback behavior can vary by client release. See [official Claude Code MCP setup](https://code.claude.com/docs/en/mcp). This package documents the supported client flags; it does not promise an already registered Claude client or a live-tested Claude OAuth grant.

## Other clients and a first task

Use Streamable HTTP with OAuth S256 PKCE and a Clipzu-approved public client/callback, or a supported secure header/environment facility for an owner-issued scoped token. A client requiring dynamic registration, confidential secrets or automatic refresh is not automatically compatible with the current service. Agent Skills support and MCP support are independent; consult the client's documented skill location.

Ask the agent to call `clipzu_capabilities`, list projects/assets and describe what it can do before writing. Then use [a workflow](editing-workflows.md) with an authorized project. Keep ordinary approval prompts enabled. A noninteractive client may need its supported approval-review mode; never use a sandbox/approval bypass just to finish an edit.

To disconnect locally, Codex offers `codex mcp logout clipzu` and `codex mcp remove clipzu`; Claude Code offers `claude mcp remove clipzu` in the same configuration scope. Local removal is not proof of server-side revocation. Revoke the owned grant through the [existing owner API or supported client revocation flow](../docs/authentication.md). Never commit credentials, cookie-bearing configuration or raw debug traffic.
