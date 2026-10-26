---
name: clipzu-motion
description: Choreograph purposeful Clipzu motion with supported clip keyframes. Use for storyboards, staggered entrances, readable holds, scene continuity, flat layered depth and timing to known audio beats.
license: MIT
---

Read capabilities and the saved project's FPS before assigning times. The available numeric tracks are `positionX`, `positionY`, uniform `scale`, `rotation` and `opacity`. Use only the connected server's supported easing presets. Do not translate a spring, custom curve or procedural expression from another system into a fabricated Clipzu API.

Plan scenes as beats: establish context, reveal the hero, develop the idea, resolve or transition. Each beat should change information, emphasis or spatial relationships. An entrance followed by an unexplained long freeze is unfinished choreography; an intentional reading pause is valid. Secondary motion can carry continuity while text holds, but should not compete with reading.

Use clip-local integer milliseconds on the project frame grid: `round(frameIndex * 1000 / fps)`. `startMs` is project time; keyframe `time` is local to the clip; `trimStartMs` selects source media and does not shift those clocks. Last keyframes must be strictly before clip duration. Do not round unsupported times silently.

Read [choreography.md](references/choreography.md) for staged examples, preset selection, scene handoffs and beat mapping. Use **clipzu-timeline** for exact edit contracts. Animation remains editable keyframe data, including all intentional holds and departures.

Preview the entrance, an interior motion frame, settle, reading hold, handoff and final frame. Watch the piece in motion when playback is available; still frames cannot establish rhythm. Use **clipzu-render** to verify the worker output. Report image-based kinetic typography and layered depth honestly: MCP has no native character animation, nested compositions, 3D camera, motion blur or procedural motion tool.
