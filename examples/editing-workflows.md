# Editing workflows

Start with live discovery, capability and ownership checks. The JSON below is **input template data**, not a response or an immediately runnable project. Replace `PROJECT_ID`, `CURRENT_REVISION`, `INITIAL_VIDEO_TRACK_ID`, `BACKGROUND_ASSET_ID` and `TITLE_ASSET_ID` with live returned values. Generate fresh request IDs for new writes. `CURRENT_REVISION` is represented by the example integer 2 below solely to keep the JSON syntactically valid; do not assume that revision.

## Create and inspect

Call `clipzu_capabilities`, `clipzu_list_projects` and `clipzu_list_assets`. If the requested existing project is found, read it and preserve unrelated work. For an authorized new composition, call `clipzu_create_project`:

```json
{
  "name": "Editorial motion study",
  "fps": 30,
  "aspectRatio": "16:9",
  "requestId": "example-create-request-0001"
}
```

Use its actual `projectId` with `clipzu_read_project`. Read `revisionNumber` and the initialized video/audio track IDs. Confirm two owned ready image sources exist. If a title is missing, request appropriate artwork through the normal upload workflow rather than inventing native text creation.

## Build an editable two-layer entrance

This small batch demonstrates correct fields, separate overlap lanes and clip-local animation. It is a starting scene, not a complete creative treatment for a long video.

```json
{
  "projectId": "PROJECT_ID",
  "expectedRevision": 2,
  "requestId": "example-edit-request-0001",
  "action": "apply",
  "operations": [
    { "type": "add_track", "id": "title_lane", "name": "Title", "kind": "video" },
    { "type": "add_clip", "id": "background", "assetId": "BACKGROUND_ASSET_ID", "trackId": "INITIAL_VIDEO_TRACK_ID", "startMs": 0, "durationMs": 3000 },
    { "type": "add_clip", "id": "title", "assetId": "TITLE_ASSET_ID", "trackId": "title_lane", "startMs": 0, "durationMs": 3000 },
    { "type": "set_keyframes", "clipId": "title", "property": "positionX", "frames": [
      { "time": 0, "value": -100, "easing": "easeOut" },
      { "time": 1000, "value": 0, "easing": "linear" },
      { "time": 2500, "value": 0, "easing": "easeIn" },
      { "time": 2967, "value": 50, "easing": "linear" }
    ] },
    { "type": "set_keyframes", "clipId": "title", "property": "opacity", "frames": [
      { "time": 0, "value": 0, "easing": "linear" },
      { "time": 500, "value": 1, "easing": "linear" },
      { "time": 2500, "value": 1, "easing": "linear" },
      { "time": 2967, "value": 0, "easing": "linear" }
    ] }
  ]
}
```

2967 ms is frame 89 at 30 FPS, not a portable last-frame timestamp for every FPS. For a different FPS choose and explicitly convert the intended frame. Read back the saved project and verify the four boundary times, held interval and foreground order. `set_keyframes` replaces a property's track; inspect existing frames before using it on an existing clip.

For sound, an additional `add_audio` operation uses `id`, a real owned audio `assetId`, an existing unlocked audio `trackId`, `startMs`, `durationMs`, optional `trimStartMs` and constant `volume`. Ensure trim plus duration fits the source. For a deliberate 500 ms source trim, a source beat at 1500 ms appears at project 1000 ms when the audio starts at zero. There is no audio envelope or beat-analysis argument.

## Reconcile and use history

Every successful edit is saved. Re-read after an error or stale revision. A transaction with one invalid operation must not partially persist valid earlier operations. Preserve idempotency on uncertain retries. To undo one authorized saved batch, call `clipzu_edit_project` with `action:"undo"`, the current project/revision and a fresh request ID; omit operations. Redo similarly uses the new revision. Do not assume remote history survives a browser save or populates the browser's in-memory Undo stack.

## Export once and verify

Resolve export gaps. Use the current saved revision and normal plan-admitted settings. This UUID is an explicit example placeholder; generate a new one for an intentional render.

```json
{
  "projectId": "PROJECT_ID",
  "expectedRevision": 2,
  "requestId": "00000000-0000-4000-8000-000000000001",
  "resolution": { "width": 1280, "height": 720 },
  "fps": 30,
  "quality": "low"
}
```

Pass this input to `clipzu_request_export`. Poll its returned job `id` using `clipzu_export_status` with `{ "jobId": "RETURNED_JOB_ID" }`, honoring rate limits. On completed/available output, call `clipzu_export_result` with that job ID. Use its authenticated result route; do not publish a signed storage URL. Decode/inspect the actual MP4 when possible and compare against real editor frames and the brief. Report an inaccessible output or terminal failure honestly instead of fabricating success.
