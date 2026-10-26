# Capabilities and boundaries

Call `clipzu_capabilities`, inspect the actual nine tool schemas and read the selected project. This reference describes the implemented command surface, not everything the full editor can do. Account scopes, plan limits and the connected worker still control admission.

| Area | Available through MCP | Boundary |
|---|---|---|
| Projects | List, read, create, revisioned edit and readback | No arbitrary document replacement; only owned projects |
| Media | List owned ready uploads and authenticated reads | Upload/import, arbitrary URL ingestion and cross-user assets are not tool operations |
| Visuals | Uploaded image/video clips on video tracks | Native text, shapes and geometry are not created by this tool surface |
| Layering | Separate overlapping video lanes; higher track order is foreground | New tracks append; no track reorder/remove/rename tool |
| Audio | Add an owned audio asset with placement, source trim and constant volume | No audio automation, ducking, beat-analysis tool or general audio edit command |
| Static transforms | x/y offsets, uniform scale, rotation and opacity | Static writes cannot replace an active property animation |
| Keyframes | positionX/Y, scale, rotation, opacity; clip-local frame-grid times | No custom Bézier, independent animated scale axes, expressions or replacing nonzero-offset tracks |
| Easing | linear, easeIn, easeOut, easeInOut, easeOutBack, easeOutExpo, easeOutElastic, easeOutBounce | No editable spring parameters or imported easing engine |
| Persistence | Atomic batches, exact revision checks, idempotent retries, bounded remote undo/redo | External editor saves invalidate remote history; browser session Undo is separate |
| Preview | Open the saved document in the actual Web editor using available browser access | No MCP screenshot, scrub, playback or preview-render tool |
| Export | Existing H.264 MP4 queue, status and authenticated result | Independent server preflight, quotas, retention and plan settings remain enforced |

The exact [tool contracts](../skills/clipzu-timeline/references/tool-contracts.md) include operation fields and bounds. Projects currently support 24/30/60 FPS and the listed aspect ratios. This does not promise every export setting to every subscription.

Nested compositions, native 3D cameras, procedural systems, motion blur, editable masks and advanced effect/filter authoring are not exposed by these tools. Existing editor documents may contain broader features; do not remove them or claim MCP can author them. Inspect `exportGaps` and let server validation reject unrenderable semantics independently. Reading an object is not proof that it is editable or supported by export.

Image alpha can supply a fixed silhouette, multiple image clips can imply flat layered depth, and word/line images can provide kinetic typography. Describe those methods honestly. They do not grant a mask editor, perspective camera or native per-character text system.

The hosted service accepts individual credentials from verified, active Clipzu accounts without tester approval. Authentication, scope and ownership checks remain mandatory. Client transport compatibility is distinct from a particular client's registered OAuth callback and granted write scopes.
