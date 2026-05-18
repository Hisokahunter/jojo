# Architecture: JoJo Fate Gravity

## 1. Product Shape

JoJo Fate Gravity is a static, client-side interactive relationship-map website.

The application should be built as a modular React + TypeScript single page application. It renders an interactive 2D character graph, allows filtering/searching/selection, shows character details, and tracks local collectible discovery progress.

This is not a multiplayer game, not a 3D scene, and not a backend-heavy application.

## 2. Required Source Documents

Before writing or changing any code, read these documents in full:

- `memory-bank/@architecture.md`
- `memory-bank/@game-design-document.md`
- `memory-bank/@tech-stack.md`
- `memory-bank/implementation-plan.md` when executing implementation steps

The game design document defines product behavior, UI expectations, interaction rules, and MVP scope.

The tech stack document defines preferred implementation choices and what should not be introduced in the first version.

The implementation plan defines the current execution order. Follow it step by step unless the user explicitly changes priorities.

## 2.1 Confirmed Implementation Decisions

- Initialize the Vite React TypeScript app directly in the project root.
- Keep `memory-bank/@architecture.md` as the mandatory AI-readable architecture source.
- Use `memory-bank/architecture.md` as the file-purpose index and update it as files are created or responsibilities change.
- Use concise original descriptions for character summaries, relationship descriptions, and UI text.
- Do not use official manga/anime screenshots or unauthorized visual assets in the first version.
- Use abstract graph visuals, original UI styling, text labels, CSS Modules, and Cytoscape styles for the first version.
- Initial collectible triggers are:
  - Discovering the Jonathan and Dio fate/rivalry relationship.
  - Exploring the Joestar bloodline connection.
  - Selecting or revealing the Gyro and Johnny golden rotation relationship.

## 3. Recommended Stack

- App framework: React
- Language: TypeScript
- Build tool: Vite
- Graph engine: Cytoscape.js
- Data source: static JSON files
- Data validation: Zod
- Styling: CSS Modules plus shared CSS tokens
- State: React Context plus custom hooks for the first version
- Unit tests: Vitest
- End-to-end tests: Playwright
- Deployment: Cloudflare Pages or any equivalent static host

Avoid adding backend services, WebSocket, database, Three.js, Redux, Next.js, or heavy animation libraries unless a requirement explicitly justifies the added complexity.

## 4. Architectural Principles

### 4.1 Modularity Is Mandatory

Code must be split by responsibility. Do not build single-file implementations or monolithic components.

Every major concern should live in its own module:

- Graph rendering
- Data loading and validation
- Filtering logic
- Selection state
- Character detail panel
- Search UI
- Collectible logic
- Responsive layout
- Styling tokens
- Tests

### 4.2 Prohibited Monoliths

Do not create giant files that mix unrelated responsibilities.

Avoid:

- One huge `App.tsx` containing graph setup, data transformation, UI panels, filters, styles, and collectible logic.
- One massive JSON file if the data naturally separates into characters, relationships, and collectibles.
- Inline styles scattered through components when shared tokens or CSS Modules are more appropriate.
- Business logic embedded directly inside render functions.
- Direct Cytoscape mutation logic spread across unrelated React components.

If a file grows beyond roughly 250-300 lines, review whether it should be split. If it contains more than one major responsibility, split it earlier.

### 4.3 Prefer Boring, Stable Solutions

Use the simplest implementation that satisfies the design document:

- Static JSON before APIs.
- CSS transitions before animation libraries.
- React Context before external state stores.
- Cytoscape.js graph features before custom graph engines.
- Clear component composition before clever abstractions.

## 5. Proposed Directory Structure

```txt
src/
  app/
    App.tsx
    AppProviders.tsx
  components/
    CharacterPanel/
      CharacterPanel.tsx
      CharacterPanel.module.css
    CollectiblesBar/
      CollectiblesBar.tsx
      CollectiblesBar.module.css
    FilterBar/
      FilterBar.tsx
      FilterBar.module.css
    GraphCanvas/
      GraphCanvas.tsx
      GraphCanvas.module.css
      cytoscapeStyles.ts
    Legend/
      Legend.tsx
      Legend.module.css
  data/
    characters.json
    relationships.json
    collectibles.json
  domain/
    collectibles.ts
    filters.ts
    graph.ts
    schema.ts
    types.ts
  hooks/
    useCollectibles.ts
    useFilters.ts
    useGraphSelection.ts
  styles/
    global.css
    tokens.css
  tests/
    collectibles.test.ts
    filters.test.ts
    schema.test.ts
```

This structure is a starting point. Keep the same separation of concerns even if filenames change.

## 6. Data Architecture

The first version should use static JSON data validated at runtime.

### 6.1 Character

```ts
export type Character = {
  id: string;
  name: string;
  romanizedName: string;
  part: number[];
  family: "Joestar" | "Brando" | "Zeppeli" | "Other";
  role: "protagonist" | "antagonist" | "ally" | "mentor" | "other";
  stand?: string | null;
  quote?: string;
  summary: string;
  tags: string[];
};
```

### 6.2 Relationship

```ts
export type Relationship = {
  id: string;
  source: string;
  target: string;
  type: "blood" | "rivalry" | "ally" | "mentor" | "fate" | "parallel";
  label: string;
  part: number[];
  strength: 1 | 2 | 3 | 4 | 5;
  description: string;
};
```

### 6.3 Collectible

```ts
export type Collectible = {
  id: string;
  name: string;
  englishName: string;
  trigger: {
    type: "select-character" | "expand-relationship" | "activate-view";
    targetId: string;
  };
  discovered: boolean;
};
```

## 7. State Architecture

Keep state small and explicit.

Recommended state groups:

- `selectedCharacterId`
- `selectedRelationshipId`
- `filters`
- `searchQuery`
- `activeView`
- `discoveredCollectibleIds`

Store browser-only progress such as discovered collectibles in `localStorage`. Do not introduce a backend or account system for this in the first version.

## 8. Graph Architecture

Cytoscape.js should be isolated behind a graph component and domain helpers.

Recommended boundaries:

- `GraphCanvas.tsx`: owns Cytoscape instance lifecycle and user event binding.
- `domain/graph.ts`: converts validated app data into Cytoscape elements.
- `GraphCanvas/cytoscapeStyles.ts`: stores graph styles.
- `hooks/useGraphSelection.ts`: coordinates selection between graph and React state.

React components outside `GraphCanvas` should not directly manipulate the Cytoscape instance.

## 9. Styling Architecture

Use CSS Modules for component-level styles and shared CSS custom properties for design tokens.

Global styles should be limited to:

- CSS reset or baseline
- typography defaults
- root layout sizing
- color and spacing tokens

Avoid one giant global stylesheet.

## 10. Testing Architecture

Write tests around logic that can regress:

- JSON schema validation
- relationship filtering
- search matching
- collectible trigger detection
- graph element conversion

At least one Playwright smoke test should verify:

1. The app loads.
2. A character can be searched.
3. A graph node can be selected.
4. The detail panel updates.

## 11. Milestone Update Rule

After every major feature or milestone, update this architecture document to reflect the real implementation.

Examples:

- A new directory structure is adopted.
- A new dependency is introduced.
- Data structure changes.
- State management changes.
- A backend is introduced.
- A deployment strategy changes.

The architecture document must remain the source of truth for future AI/code generation work.

## 12. Current Implementation Snapshot

The project has been initialized in the repository root as a Vite React TypeScript SPA.

Current dependencies:

- React
- React DOM
- Vite
- TypeScript
- Cytoscape.js
- Zod
- Vitest
- Playwright
- CSS Modules through Vite

Current implementation boundaries:

- `src/app`: app shell and provider composition.
- `src/components`: UI modules, each with local CSS Module styles.
- `src/data`: static JSON data for characters, relationships, and collectibles.
- `src/domain`: pure data validation, filtering, graph conversion, and collectible logic.
- `src/hooks`: shared React state and collectible integration.
- `src/styles`: global baseline and shared design tokens.
- `src/tests`: unit tests for domain logic.
- `tests/e2e`: Playwright smoke tests.

Implemented first-version behavior:

- Static validated data for core Part 1, Part 3, Part 5, and Part 7 characters.
- Cytoscape-rendered 2D relationship graph using original SVG avatar portraits for character nodes.
- Search input for Chinese and romanized character matching.
- Part filter and relationship type filter.
- Character detail panel.
- Legend, status bar, and collectible progress bar.
- Local storage persistence for discovered collectibles.
- Desktop and mobile responsive layout.

Verification status:

- `npm run build` passes.
- `npm test` passes.
- `npm run test:e2e` passes after installing Playwright Chromium.

Deployment:

- Free hosting target: GitHub Pages.
- Deployment method: GitHub Actions workflow at `.github/workflows/deploy.yml`.
- Vite base path: `/jojo/`, matching the repository name for project Pages.
- Production URL after Pages is enabled and the workflow succeeds: `https://hisokahunter.github.io/jojo/`.
