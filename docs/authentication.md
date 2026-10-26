# Account-specific authorization

Use `https://clipzu.com/mcp` over Streamable HTTP. Use your own verified, active account; no tester allowlisting or account-specific administrator approval is required. OAuth client identities/callbacks still require registration. Personal tokens provide self-service access for compatible clients with secure Bearer-header support. No backend, database, infrastructure credentials or local rendering service are required on the user's machine.

The hosted authorization flow uses an individual verified Clipzu login, explicit consent, authorization code and S256 PKCE. Access tokens are account-scoped, expire after one hour for OAuth, and are checked for active account eligibility, expiration and revocation on every request. The current service has no dynamic registration, client metadata registration, confidential-client secret flow or refresh tokens. A client requiring those mechanisms needs another supported configuration; do not weaken the service to connect it.

| Scope | Access |
|---|---|
| projects:read | List/read owned projects |
| projects:write | Create/edit owned projects |
| media:read | List/use/read owned ready sources; required along with project write for edits |
| exports:read | Read owned jobs/results |
| exports:write | Submit a normal plan-admitted export |

Request only the scopes the task needs. Confirm the scopes shown during consent, then verify tools with a read-only call. Discovering a tool does not prove permission to invoke it. A missing scope produces 403; a missing/expired/revoked/unapproved credential produces 401. Normal Clipzu login-session credentials are not MCP agent tokens.

Create a named token under **Settings → Developer → Access Tokens**. Select the required scopes and a 1/7/30/90-day lifetime, copy it once, then dismiss the secret. The page lists safe metadata for personal tokens and OAuth grants and lets you revoke each credential. Existing secrets cannot be revealed again. An owner can also use the authenticated owner API `POST /api/agent/tokens` with `name`, `scopes` and `expiresInSeconds`. It returns the raw value once; keep it in a private environment or client credential store. Its allowed lifetime is 60 seconds through 90 days. MCP tools cannot issue or expand tokens. Do not extract a browser session or another client's token to bootstrap access; use the account settings page or a normal authenticated owner-session API client.

## Revocation

Revoke an individual credential in **Settings → Developer → Access Tokens**. Through an authenticated owner-session API client, `GET /api/agent/tokens` lists safe token metadata; `DELETE /api/agent/tokens/:id` revokes an owned personal or OAuth grant. No raw-token lookup is provided. OAuth clients that support revocation can use the advertised revocation endpoint. Contact Clipzu if the current client offers no supported account-side revocation interface.

Client logout/removal clears local access/configuration; do not assume it revokes the server grant. Revoke the owned grant separately when required. Clipzu checks verified active account status on every credential use; account-specific tester approval is not required. Account credential changes and pending account deletion also invalidate agent access. Logging out of one ordinary Web session does not inherently revoke independent grants.

Use [client setup](../examples/mcp-client-setup.md) for connection examples. Keep secrets out of source control, shell arguments/history, prompts, screenshots and URLs. Do not commit an environment-bearing client configuration. Follow cross-origin redirects without forwarding the Clipzu Authorization header to storage.
