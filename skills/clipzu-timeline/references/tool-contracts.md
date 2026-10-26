# Tool contracts

Discover actual schemas before use. Keys are case-sensitive; extra fields are rejected. Client-specific tool prefixes may differ, but the server tool names below are exact. These are documented inputs, not fabricated responses.

| Tool | Input | Required scopes |
|---|---|---|
| `clipzu_capabilities` | `{}` | Authenticated account |
| `clipzu_list_projects` | Optional `cursor` (string), `limit` (1–100, default 25) | projects:read |
| `clipzu_read_project` | `projectId` | projects:read |
| `clipzu_list_assets` | Optional `projectId` | media:read |
| `clipzu_create_project` | `name`, `requestId`; optional `fps` (24/30/60, default 30), `aspectRatio` (16:9, 9:16, 1:1, 4:5, 4:3; default 16:9) | projects:write |
| `clipzu_edit_project` | `projectId`, positive integer `expectedRevision`, `requestId`, optional `action` (apply/undo/redo; default apply); apply requires `operations`, undo/redo omit it | projects:write, media:read |
| `clipzu_request_export` | `projectId`, `expectedRevision`, UUID `requestId`, `resolution:{width,height}`, `fps`, optional `quality` (low/medium/high/ultra; default medium) | exports:write |
| `clipzu_export_status` | `jobId` | exports:read |
| `clipzu_export_result` | `jobId` | exports:read |

Creation/edit request IDs contain 16–80 letters, digits, underscores or hyphens. Each new write needs a new identity; exact retries keep their identity and arguments. Export request IDs use UUID syntax. Do not assume a project's initial revision; create returns `projectId` and `revisionNumber`, then read it. Read results contain `id`, `revisionNumber`, `documentJson` and `exportGaps`. Export creation returns an `id` for the job, not a video file. Result returns `jobId` and an authorized `downloadUrl` only when output is available.

## Operations

All rows require `type`. IDs chosen for new tracks/clips must be unique in the document and match `[A-Za-z0-9_-]{1,64}`. Asset IDs come from owned listings. No operation accepts arbitrary URLs, a local file path, raw document JSON or an asset-metadata override.

| type | Required fields | Optional fields |
|---|---|---|
| `add_track` | `id`, `name` (1–80 characters), `kind` (video/audio) | None |
| `add_clip` | `id`, `assetId`, `trackId`, `startMs`, positive `durationMs` | `trimStartMs` (default 0) |
| `add_audio` | `id`, `assetId`, `trackId`, `startMs`, positive `durationMs` | `trimStartMs` (0), `volume` (0–2, default 1) |
| `move_clip` | `clipId`, `startMs`, `trackId` | None |
| `remove_clip` | `clipId` | None |
| `set_transform` | `clipId` | `x`, `y`, `scale`, `rotation`, `opacity` |
| `set_keyframes` | `clipId`, `property`, `frames` | None |

`add_clip` and `add_audio` do **not** accept `name`. Moving/removing/transforming/keyframing through these operations targets visual clips; do not assume matching audio-edit commands exist. Track rename/removal/reorder, arbitrary text/shape/effect creation, speed changes and audio fades are not exposed here.

Position bounds are ±15360 project pixels; uniform scale 0.05–4; rotation ±360 degrees; opacity 0–1. `set_transform` uses `x`/`y`, while `set_keyframes.property` uses `positionX`/`positionY`/`scale`/`rotation`/`opacity`.

Each frame is `{ "time": 0, "value": 1, "easing": "linear" }`. Times are increasing clip-local integer milliseconds on the project FPS grid and strictly before duration. Frames must use a supported preset, and values must fit the property's range. Easing is attached to the left keyframe of a segment. Current presets: `linear`, `easeIn`, `easeOut`, `easeInOut`, `easeOutBack`, `easeOutExpo`, `easeOutElastic`, `easeOutBounce`.

Current authored bounds: 32 operations per edit, 16 tracks, 100 total media clips, 64 frames per property track, one-hour timeline and 1 MiB document. Runtime discovery may impose different/lower bounds. Off-grid times, locked lanes, same-video-lane overlaps, source overflow, foreign assets and unsupported semantics are rejected. Do not remove checks to admit a project.

Export resolution fields are integers 16–3840, but this schema range is not an account entitlement or codec guarantee. Use ordinary plan-admitted dimensions/FPS/quality and even H.264 dimensions. The tool requests H.264 MP4 with caption burning disabled; there is no `format`, `codec` or `burnCaptions` argument. Account quotas and independent server preflight apply.
