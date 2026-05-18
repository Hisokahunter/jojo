# Progress

## Completed

- Step 1: Initialized a Vite React TypeScript project directly in the project root.
  - Validation: `npm run build` passed.
  - Validation: `npm test` passed.
- Step 2: Established modular source directories.
  - Validation: source code is split across `app`, `components`, `data`, `domain`, `hooks`, `styles`, and `tests`.
- Step 3: Added global styles and design tokens.
  - Validation: build passed with imported CSS and token usage.
- Step 4: Defined domain types.
  - Validation: TypeScript build passed.
- Step 5: Created the first static dataset.
  - Validation: schema tests and build passed.
- Step 6: Added Zod data validation.
  - Validation: schema tests cover valid bundled data and invalid relationship endpoints.
- Step 7: Implemented the main app layout.
  - Validation: Playwright smoke tests passed on desktop and mobile viewports.
- Step 8: Implemented the filter bar.
  - Validation: Playwright search, relationship filter, and reset tests passed.
- Step 9: Implemented the character detail panel empty and selected states.
  - Validation: build passed with panel integration.
- Step 10: Installed and isolated Cytoscape.js.
  - Validation: build passed with Cytoscape bundled.
- Step 11: Added graph data conversion.
  - Validation: graph conversion unit test passed.
- Step 12: Rendered the base relationship graph.
  - Validation: Playwright confirmed graph canvas visibility.
- Step 13: Added graph styling.
  - Validation: build passed with Cytoscape stylesheet module.
- Step 14: Added shared selection state.
  - Validation: TypeScript build passed with context state.
- Step 15: Added graph node and edge click selection handlers.
  - Validation: build passed with typed Cytoscape events.
- Step 16: Displayed selected character details.
  - Validation: build passed with details panel integration.
- Step 17: Added search matching logic.
  - Validation: search unit tests passed for Chinese and romanized names.
- Step 18: Connected search input.
  - Validation: Playwright search test passed on desktop and mobile.
- Step 19: Added part filtering logic.
  - Validation: part filtering unit test passed.
- Step 20: Added relationship type filtering logic.
  - Validation: relationship filtering unit tests passed.
- Step 21: Connected filter controls.
  - Validation: Playwright relationship filter and reset tests passed.
- Step 22: Implemented graph legend.
  - Validation: build passed with legend module.
- Step 23: Implemented status bar.
  - Validation: Playwright tests verified node and relationship count text.
- Step 24: Implemented collectible trigger logic.
  - Validation: collectible unit tests passed.
- Step 25: Implemented collectible progress display with localStorage persistence.
  - Validation: build passed with localStorage-backed state.
- Step 26: Added desktop layout rules.
  - Validation: Playwright desktop smoke tests passed.
- Step 27: Added mobile layout rules.
  - Validation: Playwright mobile smoke tests passed.
- Step 28: Added baseline accessibility support.
  - Validation: controls have labels and are reachable in Playwright by accessible names.
- Step 29: Added unit tests for core domain logic.
  - Validation: `npm test` passed with 5 test files and 10 tests.
- Step 30: Added Playwright smoke tests.
  - Validation: `npm run test:e2e` passed with 4 tests.
- Step 31: Completed final acceptance pass.
  - Validation: `npm run build` passed.
  - Validation: `npm test` passed with 5 test files and 10 tests.
  - Validation: `npm run test:e2e` passed with 4 desktop/mobile smoke tests after rerunning outside the sandbox because Playwright worker spawning was blocked by `EPERM`.
  - Status: Awaiting user verification before Step 32.
- Visual update: Replaced geometric character node bodies with original avatar-style SVG portraits.
  - Validation: `npm run build` passed.
  - Validation: `npm test` passed with 5 test files and 10 tests.
  - Validation: `npm run test:e2e` passed with 4 desktop/mobile smoke tests.
  - Validation: `GET /avatars/jonathan-joestar.svg` returned HTTP 200 from the local dev server.
- Deployment setup: Added GitHub Pages deployment configuration.
  - Validation: `npm run build` passed.
  - Validation: `npm test` passed with 5 test files and 10 tests.
  - Validation: `npm run test:e2e` passed with 4 desktop/mobile smoke tests.
  - Follow-up: First GitHub Actions run failed during dependency installation because the workflow used a broad Node 22 version while dependencies require Node 22.12+ or 24+.
  - Fix: Pin GitHub Actions to Node 24.
  - Follow-up: Second GitHub Actions run still failed during dependency installation; the lockfile had dependency tarball URLs pinned to a regional npm mirror.
  - Fix: Repoint lockfile resolved URLs to the official npm registry.
  - Validation pending: push workflow fix to GitHub and confirm Pages deployment.

## Remaining

- Step 32: Continue updating architecture after future milestones.

## Verification Commands

- `npm run build`
- `npm test`
- `npm run test:e2e`
