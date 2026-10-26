# Choreography using the existing tracks

Use one motif that serves the brief, such as a decisive horizontal reveal or a quiet editorial expansion. Give the hero the largest meaningful change. Supporting layers can enter a few frames later, travel a smaller distance or settle sooner. Do not apply identical timing and displacement to every layer.

At 30 FPS a three-frame stagger is 100 ms; at 24 FPS the same three frames are 125 ms. Convert the chosen frame count for the actual project. Reuse the intended rhythm, not hardcoded milliseconds from another FPS.

## Six-second title study

This is a planning example, not a tool response or mandatory template. Assume existing full-canvas background, title and accent artwork on separate visual tracks, and a 30 FPS project.

| Project interval | Visual purpose | Supported treatment |
|---|---|---|
| 0–500 ms | Establish identity | Background stays legible; accent drifts into alignment using position and opacity. |
| 500–1500 ms | Give the headline priority | Title's local X offset settles from -100 to 0; scale can settle from 0.96 to 1. Keep opacity within 0–1. |
| 1500–3000 ms | Read and develop | Title holds; accent changes position or scale gently without crossing the text. |
| 3000–4500 ms | Introduce a second emphasis | A second word/card enters on a separate lane. Match an existing direction or alignment; do not rotate unrelated objects without a reason. |
| 4500–5500 ms | Resolve | Supporting motion settles. Let the action or brand own the final reading beat. |
| 5500–5967 ms | Exit or hand off | Animate outgoing opacity/position or leave a deliberate end card. The final keyframe remains before 6000 ms. |

If a clip starts at project 500 ms, a keyframe at local 1000 ms appears at project 1500 ms. Do not store 1500 in that track unless that is the intended local time. Read existing nonzero `keyframeTimeOffsetMs`; replacing such tracks is currently gated, not an invitation to erase the offset.

## Preset vocabulary

- `linear`: constant progression, useful for deliberate travel or timing markers.
- `easeOut`: fast arrival followed by a gentle settle.
- `easeIn`: a departure that gathers speed.
- `easeInOut`: balanced travel between composed states.
- `easeOutBack`: restrained overshoot for a hero or graphic accent. Prefer scale or position; a curve's overshoot is inappropriate for values that must stay within opacity bounds.
- `easeOutExpo`: a brisk entrance with a long settle; verify the middle of the segment is not visually empty.
- `easeOutElastic`, `easeOutBounce`: strong character. Use sparingly when the brief calls for it and preview the result. They are presets, not configurable physics simulations.

Easing on the **left** keyframe controls its segment to the next frame. A held interval uses equal values at its endpoints; do not accidentally interpolate an entire long reading pause. For explicit anticipation/follow-through, author a few purposeful position/scale values on the frame grid. Repeated tiny corrections can look like jitter.

## Handoffs, depth and type

Put simultaneous visual clips on different video tracks; new tracks are added above existing ones. For a crossfade, overlap incoming and outgoing clips and coordinate their opacity tracks. A slide handoff can continue one direction across the cut. These use normal clips and keyframes, not a transition-creation tool. Overlap changes the total scene schedule; explicitly count project start/end times.

A flat layered composition can imply depth with different translation distances, restrained scale changes, occlusion and foreground/background timing. This is a 2.5D visual treatment, not a camera or perspective engine. Avoid promising lighting, blur, arbitrary masks or extrusion.

Rotation acts around the source image's center, which may be far from the visible object in full-canvas transparent artwork. A small-looking graphic can therefore travel substantially as its clip rotates. Inspect its whole motion envelope; reduce rotation or coordinate a position track when that travel breaks the intended framing.

For kinetic type, animate existing word/line images separately when available. A single raster title cannot gain per-letter animation through a transform track. Keep the title readable during the intended reading beat; compare actual output at small viewing size.

## Audio

Use known or inspected beat times, not an invented beat-analysis tool. For speed-1 audio, project event time is `audioStartMs + sourceBeatMs - trimStartMs`; discard source beats outside the chosen source window, then map visual events to the project frame grid. Distinguish a musical lead/lag from an error.

`add_audio` offers a constant `volume` and a source trim, not automated ducking, audio keyframes or an effect chain. Use an already authorized prepared source when those treatments are essential. Verify that the source window fits its duration, the mix does not clip and any intentionally audible ending is not truncated.
