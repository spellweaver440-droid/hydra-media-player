# Stack Recommendation — HydraPlayer Prototype

This document explains the recommended stack choices and rationale for the hybrid media player (Windows Media Player + ARPWire-like audio + Hydra-style live visuals) targeted at Kali Linux / VS Code.

1) UI / Frontend
- Electron + React (prototype): quick iteration, WebGL integration, cross-platform. The prototype in this repo uses Electron with a simple React UI (via CDN for fast prototyping).
- Styling: CSS with neon gradients and canvas backgrounds to get the "trippy neon / Matrix / ghost in the shell" aesthetic.

2) Media Playback
- Web Audio (HTML5 Audio + Web Audio API) for prototype playback and analysis. For low-latency or professional routing use PortAudio / JACK or native Node bindings.
- For advanced decoding or streaming, integrate FFmpeg (native) or WASM builds of decoders.

3) Audio Engine / DSP
- Prototype: Web Audio API's AnalyserNode provides FFT and frequency data for visuals.
- Production: consider a Node native module (C++/JUCE) or WASM DSP modules for more advanced effects and lower latency.

4) Visual Engine / Live Coding
- WebGL + GLSL + three.js / r3f for 2D/3D visuals; Hydra-style live coding can be built on top of a WebGL canvas and a small sandboxed JS runtime.
- Allow users to write small JS functions that receive `canvas`, `ctx`, and `audioData` (FFT) as inputs; validate and sandbox them.

5) Networking / Real-time Streaming
- Use WebSockets for control messages and metadata; use UDP (with an appropriate audio-over-UDP protocol) for raw low-latency audio streaming.

6) Extensibility / Plugins
- Provide a local `plugins/` folder where Node-style modules export `meta` and optional hooks (e.g., `getVisualCode`). The main process can load metadata and expose a safe API to the renderer.

7) Performance & Native Integration
- Use WASM for heavy DSP or visual computation.
- For system-level audio routing and lower latency, integrate JACK or PortAudio backends.

Notes on Tools from the attachments
- The first attachment (Electron ecosystem diagram) matches our choice of Electron for the app shell and packaging tools.
- The second attachment (JS / WASM / WebGL stack) confirms using `three.js`, `r3f`, `Babylon.js` and WASM as options for heavier workloads.
