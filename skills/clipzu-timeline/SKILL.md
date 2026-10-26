---
name: clipzu-timeline
description: Execute reliable Clipzu MCP timeline edits with real operation schemas, owned media, tracks, source trims, clip-local keyframes, revisions and transactional Undo/Redo.
license: MIT
---

Discover tools and read the current project. Read [tool-contracts.md](references/tool-contracts.md) for the actual nine tools and operation fields before constructing a batch. The connected server's schemas take precedence over this reference.

Choose owned ready media from `clipzu_list_assets`. Use returned track IDs from `documentJson.timeline.tracks`, not guessed lane numbers. Images/videos use video tracks; audio assets use audio tracks. Higher track order is foreground; membership uses `trackId`. New tracks are appended above existing tracks. There is no reorder-track operation. Do not infer compositing order from a screenshot's vertical lane positions alone.

Respect locked tracks and existing clips. Put overlapping visuals on separate video tracks. Keep source time separate: `startMs` is timeline placement, `trimStartMs` is source offset, and `durationMs` is the used length. A still image requires trim zero. Video/audio source windows cannot exceed the asset's real duration. Added clips have speed 1.

Construct at most the advertised operation limit per batch. Every intentional write uses a fresh request identity and current `expectedRevision`. The server applies the entire batch atomically and saves it once; a failure should leave the document and revision unchanged. A successful edit is already a save. Re-read to verify track order, source references, duration, transforms and `exportGaps` before rendering.

Use `set_keyframes` for animated properties; a static `set_transform` cannot overwrite an active animation. Track replacement replaces that property's authored frames. Read before replacing and preserve unrelated tracks. Replacing existing offset keyframe tracks is currently rejected. Preserve unsupported authored data and explain the boundary instead of rewriting it.

Remote `undo`/`redo` apply one saved batch and produce a new revision. Supply no operations for those actions. History is bounded and an external editor save invalidates it; the browser's session Undo stack is separate. On a conflict, read and reconcile rather than forcing a revision. Use **clipzu-best-practices** recovery guidance when it is available; otherwise stop and report an unresolved error honestly.
