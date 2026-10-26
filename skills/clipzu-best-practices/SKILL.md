---
name: clipzu-best-practices
description: Plan and coordinate edits to hosted Clipzu projects through MCP. Use for Clipzu editing requests, capability discovery, preserving existing work, and truthful completion reports.
license: MIT
---

Start with `clipzu_capabilities` and the client's actual tool schemas. Discover this account's projects and uploaded media with `clipzu_list_projects` and `clipzu_list_assets`; read the chosen project before editing. Capabilities, permissions and plan limits can differ from these examples. An installed skill grants no account access.

Understand the requested audience, format, message, duration and deliverable. Resolve missing decisions that affect the result; make reasonable creative choices for the rest. Give a short plan naming the hero element, scene beats, existing material to preserve and verification needed. Editing authorization does not automatically authorize another billable render or unrelated asset use.

Load focused skills only as needed:

- **clipzu-design** for art direction, typography, color, layout and visual critique.
- **clipzu-motion** for story beats, supported keyframe choreography and audio timing.
- **clipzu-timeline** for exact tool contracts, source trims, atomic edits and revisions.
- **clipzu-render** for actual preview/output inspection and export jobs.

Use the connected account's ready asset IDs. Upload or prepare missing artwork through separately available, authorized tools or Clipzu's UI; MCP has no upload, native text or shape creation tool. Do not substitute an external rendering framework. A raster title animated as one clip remains image artwork.

Use validated operations with the latest `expectedRevision`. Each successful edit saves immediately. Check the returned result, then `clipzu_read_project` to confirm the intended timing, tracks, keyframes and export gaps. Preserve unrelated clips, locks and authored curves. Do not replace the entire document or flatten unsupported animation to make an export pass.

Read [recovery.md](references/recovery.md) for authorization, revision, quota, retry and failure handling. Report what actually changed, saved revision, available preview evidence and export state. Distinguish an accepted request, completed job, inspected MP4 and creative approval. If verification is unavailable, say precisely what remains unchecked.
