# Distribution and real-agent validation

This page records the earlier isolated distribution acceptance. Public self-service access was enabled afterward: verified active users can create their own credentials in **Settings → Developer → Access Tokens**, without tester approval. See [authentication](authentication.md) for the current access flow. Private-rollout statements below describe the earlier test conditions.

Verified on 26 October 2026 using supported Node 24.22.1. This was an isolated acceptance of the existing Clipzu Web/API/FFmpeg worker, with a fresh disposable database and synthetic owned media. **No production deployment, account/cohort change, worker change or public MCP activation occurred.** No nested Git repository or new remote was created.

## Distribution checks

- Five canonical, unversioned skills pass the skill-creator frontmatter validator. Names match folders; only name, description and MIT license fields are present. Detailed references remain within each installed skill's directory.
- Skills CLI 1.7.4 installed from a standalone copied folder outside the application checkout into separate Codex and Claude Code projects. Both discovered exactly the intended five skills. All 30 copied instruction/reference/license files across the two clients match their source; no symlink back to a developer checkout is required. Existing internal Clipzu skills were not imported or deleted.
- Three JSON workflow inputs validate against schemas obtained from the actual isolated server's `tools/list`, using the official SDK's AJV validator. All nine documented tool names match discovery.
- `node checks/check-package.mjs` checks canonical definitions, local links, independent skill references, generation-label contamination and likely private paths/credentials. The package was also reviewed for secrets, infrastructure details, backend code and copied third-party material.
- Research/license findings are recorded in [third-party notices](../THIRD_PARTY_NOTICES.md). All guidance is original Clipzu-specific writing. No upstream renderer code, assets or dependencies are distributed.

## Actual native-agent workflow

Codex CLI 0.164.0-alpha.11.1 used the installed public skills and an individual scoped credential against the isolated hosted-style MCP endpoint. It retained its normal sandbox and automatic approval review. It did not write database rows, inject project JSON or render a substitute video. Operator setup/upload and independent output inspection are distinguished from agent editing.

The agent communicated art direction, typography/hierarchy, palette roles and scene beats before its first write. It acknowledged that exact source hues were not visually inspected at that planning stage. Sixteen successful native tool calls covered all nine tools: discovery, owned project/media inspection, creation, validated editing, saved readback, export submission, polling and result retrieval.

It created one six-second, 30 FPS editable project using three PNG layers and one audio clip, with a static background, staggered arrival, a middle development and a final resolved hold. Audio starts at zero with a 500 ms source trim; known source markers map to output 1/3/5 seconds. Uploaded title artwork remains an image treatment, not native text.

Technical success did not automatically pass creative review. Given actual decoded frames and the editor screenshot, the agent's design/render review independently detected unintended bottom-edge clipping at the middle beat. The rotation of off-center artwork in a full-canvas PNG caused that travel. A concrete, bounded MCP correction reduced the rotation peak and added compensating Y keyframes. One revised export was authorized; the first output was preserved. The motion reference now explains this source-center behavior.

The corrected saved project has 26 keyframe points across **position X/Y, uniform scale, rotation and opacity**, and no reported export gaps. The correction preserved all other visual clips, audio, tracks and unrelated animation. Saved revision 4 remained unchanged after reopening/scrubbing the actual Web editor. Exactly two real exports completed: the original and the corrected result; rejected tests admitted no extra jobs.

## Actual output checks

The corrected worker MP4 is H.264 960×540 at 30 FPS, 180 frames, with AAC 48 kHz audio. Both streams start at 0.000000 and last 6.000000 seconds. Size: 1,006,966 bytes. SHA-256: `a50fb453baaf8b65ee2c87955e9c1b7b2a3c45749afc55fdb1256e29613b1cd3`.

The operator opened the same saved project in the real editor, captured its Timeline/Preview/Animation Inspector, and compared decoded MP4 frames after all three actual image layers had loaded. No project state or preview renderer was injected. RGB MAE at 160×90 passed the unchanged existing bound of <12:

| Time (ms) | MAE |
|---:|---:|
| 0 | 1.214 |
| 500 | 1.672 |
| 1000 | 1.582 |
| 1500 | 1.894 |
| 3000 | 1.762 |
| 4500 | 1.572 |
| 5000 | 1.673 |
| 5967, final frame | 1.673 |

The three decoded audio markers measured 1001/3000/4999 ms, maximum error 1 ms against a one-frame (33.33 ms) bound. Actual Chrome playback reached the end with 180 decoded frames, zero dropped frames and no media error. Playback automation was muted; **no human listening review is claimed**. Visual inspection confirmed the corrected middle frame retains the orbit inside the intended canvas and preserves headline readability. This is a small correctness/design-review fixture, not a finished creative campaign or performance benchmark.

## Error behavior and compatibility limits

Separate native-agent runs exercised a stale revision and a read-only credential. The agent reported the actual `PROJECT_REVISION_CONFLICT` and `Insufficient scope`, re-read rather than forcing a save, and did not seek another identity or claim a successful edit. A 4K/60/ultra request returned `RESOLUTION_NOT_AVAILABLE`; it was reported without silently downgrading, submitting another job or changing limits. The client wrapper exposed an insufficient-scope transport error, not an HTTP status, so this evidence does not invent a client-observed 403.

Capabilities were used to explain unavailable custom Bézier/procedural/native-text authoring. No successful writes occurred in the error or visual-review passes. A terminal worker failure was not deliberately injected; the export-failure test covers real admission rejection. Three temporary local credentials were revoked normally before the existing harness was asked to shut down its owned runtime.

Codex editing/rendering and both clients' local skill installation were actually exercised. Claude Code 2.1.296 flags were checked against its installed CLI and official documentation; **a Claude OAuth connection/editing run was not performed**. OAuth requires a registered public client ID and callback; this is client registration, not user/tester approval. Other clients are conditional on the supported Streamable HTTP authentication mechanisms. Agent Skills remain optional.

Evidence metrics are retained in [validation.metrics.json](validation.metrics.json). MP4s, decoded frames, screenshots and raw client logs are operator-held acceptance artifacts, not required installation assets or publicly distributed customer data. The package includes no credentials, private deployment instructions or dependency on those artifact paths.
