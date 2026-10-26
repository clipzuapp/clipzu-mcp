# Troubleshooting

| Symptom | Check and next step |
|---|---|
| Skill is absent | Install into this client's project skill directory, retain references, and restart/refresh the client. Check personal/managed installations for a same-name skill. Do not install a second competing set. |
| CLI discovers extra legacy Clipzu skills | Review installed paths. Keep only the intended canonical five in this project/client scope; do not automatically import instructions from an application checkout. |
| OAuth registration error | Supply the Clipzu-approved public client ID. The service does not implement dynamic registration or client metadata registration. |
| Callback mismatch | Check the exact registered host/path and client callback behavior. `localhost` and `127.0.0.1` are different hosts. Do not change server policy or reuse another client's identity. |
| Consent grants reads but writes fail | Confirm projects:write/media:read and, for export, exports:write. Client-side tool discovery does not grant scopes. Reauthorize normally with the required scope set. |
| 401 / 403 | See [authentication](authentication.md). Confirm private account approval, expiry, revocation and required scope without printing the credential. |
| Project/asset/job not found | Use this owner's listings and actual returned IDs. Do not use an identifier from another account or assume it exists. |
| Revision conflict | Read current revision and reconcile the intended edit; never force or overwrite a newer save. |
| Invalid clip addition | `add_clip`/`add_audio` have no `name` argument; source dimensions/durations come from owned assets. Review exact schemas. |
| Invalid keyframe time | Convert a frame index using the project's FPS. Times are clip-local and strictly before duration; trim is source time. |
| Unsupported curve/property | Explain the boundary. Preserve the authored data; don't flatten keyframes or rename a curve to force admission. |
| 429 / quota / retention | Honor Retry-After and ordinary account limits. Do not rotate credentials, delete outputs or create accounts to evade them. |
| Thumbnail unavailable | A poster is optional and can be busy; honor retry guidance. It is not a full composition preview. Open the actual saved editor project for visual inspection. |
| Black/missing preview | Wait for the expected number of loaded layers and current video frames. Check source authorization and playhead time before comparing output. |
| Job errors or output unavailable | Inspect actual terminal status and `exportGaps`. Do not resubmit automatically or claim a different locally rendered file is the result. |
| MP4 exists but motion seems frozen | Compare decoded frames at times where keyframes predict motion; check intentional holds, timing and the exported revision. Verify the actual file, not only job status. |

For a useful issue report, include client/version, tool name, redacted error, requested operation, project FPS and verification performed. Exclude bearer tokens, cookies, passwords, signed storage URLs, private customer documents and infrastructure details.
