# Review the delivered piece

## Technical inspection

Probe the downloaded MP4 with an available media inspector. Record dimensions, codec, frame rate, duration and each audio/video stream's start/end time. Compare them with the submitted settings and intended timeline, allowing documented codec padding rather than unexplained offsets. Playback should seek and decode normally. A file extension or successful job status is insufficient.

Decode representative frames at known project-frame times. Compare them with the same saved project in the actual browser preview: start, moving interior, settle boundary, overlap, outro and last active frame. Confirm foreground/background order, transparency, source trims and every authored transform property. Two identical frames may be an intentional hold; choose samples where the saved tracks predict a change before diagnosing frozen animation.

Wait for all expected image/video layers and frame readiness in the browser. Verify the playhead's frame/timecode. Compare equal framing, aspect ratio and scale. Use a documented tolerance appropriate to compression and resizing, never adjust it after a failure simply to pass. Existing Clipzu acceptance compared RGB images at 160×90 with MAE <12; that measured fixture bound does not replace checking visible layout or timing defects.

For sound, compare known source events after trim with timeline time. Listen to the beginning, transitions, speech/music balance and ending. Where numeric analysis is available, record marker offsets and use a justified bound such as one project frame. A source trim of 500 ms should move a source marker at 1500 ms to output 1000 ms when the audio clip starts at zero. Do not claim a listening test from timestamps alone.

## Creative inspection

Watch the whole exported piece at the target viewing size if playback is available. A sequence of stills proves neither pacing nor a clean audible edit. Report a playback/listening check only when actually performed.

- **Hierarchy:** Can the intended message be identified quickly? Does each reading hold last long enough for the actual copy?
- **Choreography:** Does movement reveal, connect or emphasize something? Are there unplanned dead stretches, distracting spins or simultaneous competing entrances?
- **Continuity:** Does the outgoing scene prepare the incoming scene? Check the middle of crossfades for muddy contrast and doubled text.
- **Framing:** Do moving elements stay within intentional bounds? Check transformed full-canvas image edges, accidental clipping and letter softness.
- **Sound:** Do accents land where intended? Are cuts, clipping, abrupt tails or an unintended silent gap audible?
- **Finish:** Are small details consistent with the brief rather than decorative clutter? Distinguish an intentional end card from a frozen render.

Give time-specific corrections using supported edits. Do not add unsupported blur, masks, effects or a new renderer to conceal a problem. If a technical or visual check fails, keep the editable project, state the failure and agree on a concrete correction before another quota-consuming render. Preserve the original export for comparison when retention permits.
