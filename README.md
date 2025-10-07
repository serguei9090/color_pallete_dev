# Palette Studio

Palette Studio is a fully featured color palette designer that runs on the web and as a Windows desktop application powered by Electron. Explore expertly curated themes, craft custom palettes for both light and dark modes, preview UI components, and export the palette JSON for integration into design systems or codebases.

## Features

- **Extensive library** of 12 professional themes with coordinated light and dark variants.
- **Custom palette builder** with per-role controls for both variants (background, surface, primary, link, text, muted, border).
- **Live UI preview** showcasing navigation, cards, tables, CTAs, and feedback components rendered with the active palette.
- **One-click JSON export** that works in the browser and Electron via the secure bridge layer.
- **Electron packaging** for Windows using Electron Builder, including IPC-based file saving and production build pipeline.
- **Modern stack** powered by Vite, React, TypeScript, Tailwind CSS utilities, ESLint, Prettier, and Vitest.

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+

Install dependencies:

```bash
npm install
```

### Development workflows

#### Run the web app

```bash
npm run dev
```

This starts Vite on <http://localhost:5173>. The UI updates instantly thanks to hot module replacement.

#### Type checking & linting

```bash
npm run typecheck
npm run lint
```

#### Run tests

```bash
npm run test
```

Vitest currently includes placeholder coverage you can extend with component tests.

#### Build production web assets

```bash
npm run build
```

Output is written to `dist/`.

### Electron development

Compile the Electron process scripts and launch a development window connected to Vite:

```bash
npm run electron:compile
npm run electron:dev
```

The first command transpiles `electron/*.ts` into `dist-electron/`. The second command runs Vite and opens Electron with live reload support. Use `Ctrl+Shift+I` to open the dev tools.

### Package a Windows installer

```bash
npm run electron:build
```

This performs a production web build, compiles the Electron main & preload scripts, and then uses Electron Builder to generate an NSIS installer inside the `release/` directory.

### Deploy the web build

1. Run `npm run build`.
2. Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

### App structure

```
├── electron/          # Electron main & preload process source
├── public/            # Static assets (favicon)
├── src/
│   ├── components/    # Reusable UI components & previews
│   ├── data/          # Palette definitions and typings
│   ├── lib/           # Shared helpers (e.g., JSON export)
│   └── styles/        # Tailwind entry point
├── dist/              # Web production build (generated)
└── dist-electron/     # Electron transpiled files (generated)
```

## JSON export format

Click **Export JSON** to download a file shaped like the example below:

```json
{
  "themeId": "modern",
  "name": "Modern Theme",
  "description": "Sleek interface with azure accents",
  "currentVariant": "dark",
  "variants": {
    "dark": {
      "background": { "name": "Jet Black", "hex": "#181A1B", "usage": "Main background" },
      "surface": { "name": "Charcoal Gray", "hex": "#212325", "usage": "Surfaces" }
    },
    "light": {
      "background": { "name": "Paper White", "hex": "#FFFFFF", "usage": "Main background" }
    }
  }
}
```

Use this payload to power documentation sites, design tokens, or automated theme pipelines.

## Accessibility tips

- Ensure adequate contrast between text and backgrounds when editing palettes.
- Keep semantic color naming consistent for long-term maintainability.
- Validate theme combinations with tools such as Stark, axe DevTools, or the WCAG contrast calculator.

## License

[MIT](./LICENSE)
