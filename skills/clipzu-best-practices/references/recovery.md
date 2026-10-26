# Recovery without losing the user's work

| Observation | Response |
|---|---|
| Missing tool/property | Re-read capabilities and discovery. Offer an achievable treatment, or identify the missing capability. Do not invent an endpoint or silently downgrade the design. |
| HTTP 401 | Credential may be absent, expired, revoked or outside the private cohort. Reauthorize through the owner/client flow. Never use another identity or extract a credential from logs. |
| HTTP 403 | Explain missing scope or access. Ask the owner to authorize the necessary scope; a token cannot grant itself more authority. |
| Not found | Check the supplied identifier and owned listings. Ownership failures deliberately need not reveal whether another user's object exists. |
| Revision conflict | Re-read the project, compare the intended change with the latest state, then reconcile. Use a new request identity for a genuinely changed edit. Do not force the old revision. |
| Invalid batch | Nothing should be saved. Inspect the actionable error and re-read if uncertain. Correct only the rejected arguments; do not replay a successful write as a new request. |
| Uncertain network result | Retry the identical write with the identical request ID and arguments. A changed payload with the same ID conflicts. |
| 429 | Honor Retry-After. Account limits can be shared across credentials. Poll less; do not rotate tokens or accounts. |
| Plan/storage/export limit | Explain the restriction. Change output settings only with a clear acceptable tradeoff. Never delete retained outputs or change a subscription to finish a task without authorization. |
| Export error/unavailable output | Record the terminal error and stop claiming success. Re-read gaps/settings and investigate the stated cause. Do not automatically submit repeated renders. |

Creation/edit request IDs are 16–80 letters, digits, underscores or hyphens. Export request IDs are fresh UUIDs. Keep a write's identity and exact arguments until its result is known. Use a different identity for every intentional new write.

Keep credentials in the client's credential store or a private process environment. Do not place them in prompts, project JSON, source files, screenshots, URLs or reports. Log tool names and redacted outcomes rather than raw authentication traffic or signed storage links.

When a requested result is unavailable, retain useful completed work and explain the concrete gap. Do not call a generated plan an edited project, a static PNG an animated title, or a job status an inspected video.
