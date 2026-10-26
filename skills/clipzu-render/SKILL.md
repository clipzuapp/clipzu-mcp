---
name: clipzu-render
description: Submit and verify Clipzu exports through the existing MCP worker tools. Use for saved-revision admission, real preview inspection, MP4/audio checks, animation parity and creative output review.
license: MIT
---

Read capabilities and the saved project immediately before export. Resolve `exportGaps`; preserve authored curves that cannot be rendered and explain the restriction. Use the actual account's permissions and normal plan limits. An installed skill does not authorize repeated renders or deletion of retained outputs.

When browser access exists, open the saved project in the real Clipzu editor. Inspect Timeline, Preview and the relevant Animation Inspector. Wait for required media to load before judging a frame; an empty collection passing an “all loaded” check is not readiness. Sample clip start, moving interiors, keyframe boundaries, scene overlaps and the final active frame. No MCP tool currently supplies a preview image or screenshot.

For an authorized render, call `clipzu_request_export` with `projectId`, latest positive `expectedRevision`, a fresh UUID `requestId`, `resolution:{width,height}`, supported `fps` and an admitted `quality`. The tool chooses H.264 MP4. It does not accept extra codec/format fields. Use the returned `id` as `jobId` for `clipzu_export_status`. Poll with a reasonable delay and honor Retry-After; retry an uncertain submission only with identical arguments/identity.

On completed status, call `clipzu_export_result`. Download its `downloadUrl` using the same agent Bearer credential in a header through the client's secure download facility, stripping authorization on a cross-origin storage redirect. Never append a token to a URL or expose signed links. If the client cannot retrieve bytes securely, report that limitation and direct the owner to the normal authenticated Clipzu download.

Read [quality-review.md](references/quality-review.md) for technical and creative checks. Inspect the actual output when inspection tools are available; local decoding is verification, not permission to render a replacement. Report saved revision, job state, retrieved/inspected output, measured results and remaining gaps separately. A completed job alone does not establish parity, correct sound or professional design.
