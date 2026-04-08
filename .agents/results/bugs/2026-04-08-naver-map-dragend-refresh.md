---
title: Naver Map dragend does not reliably refresh store markers
date: 2026-04-08
area: frontend
severity: medium
status: fixed
---

## Symptom
- Dragging the Naver map and releasing (drag end) did not reliably trigger a store re-query and marker refresh.

## Root Cause
- `app/components/NaverMap/index.tsx` re-injected the Naver Maps SDK script and re-created the map instance whenever `latitude` / `longitude` props changed.
- After wiring `dragend -> setCurrentPosition(...)`, the center updates led to frequent re-mount-like behavior (map recreation), which broke event/listener stability and marker rendering.

## Fix
- Load the Naver Maps SDK and initialize the map only once.
- Update the center via `map.setCenter(...)` when `latitude` / `longitude` props change.
- Bind the `dragend` listener via a dedicated effect with cleanup.
- Clear old marker instances before rendering the next marker set.

## Verification
- `npm run typecheck`

## Notes
- Local `npm run build` can fail if `build/` is owned by `root` (EACCES on removing `build/server`).
- Local `npm run lint` can fail if `@typescript-eslint/parser` is missing from dev dependencies.

