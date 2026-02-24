# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

World of Tanks skins gallery built with SvelteKit. Two pages: a filterable grid homepage and individual skin detail pages with image slideshows. Content lives in `static/content/` as JSON + image/download files, queried server-side via `node:fs`.

## Commands

All commands run from the `app/` directory using **bun** (provided via Nix flake + direnv):

- `bun run dev` — Start dev server
- `bun run build` — Production build
- `bun run check` — Type-check with svelte-check
- `bun run lint` — Prettier + ESLint checks
- `bun run format` — Auto-format with Prettier
- `bun run scripts/convert-content.ts` — One-time: converts Hugo content from `../../wot-skins-static/content/` into `static/content/*/index.json`

## Tech Stack

- **Svelte 5** with runes (`$props()`, `$state()`, `$derived()`, `$bindable()`) — not legacy Svelte 4 syntax
- **SvelteKit 2** — file-based routing, SSR
- **TypeScript** (strict mode)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin
- **Vite 7**

## Architecture

### Content System

Content is a filesystem "database" in `static/content/{slug}/`:
- `index.json` — metadata (name, artist, category, tank, tier, class, nation, weight, description, images[], downloads[])
- `*.webp` — skin images (served directly from static)
- `*.wotmod`, `*.fbx`, `*.zip` — downloadable files

Server-side loading (`src/lib/server/content.ts`):
- `getAllSkins()` — reads all `index.json` files, sorts by weight (asc) then date (newest first)
- `getSkin(slug)` — reads single skin, returns null if not found

### Data Flow

```
static/content/*/index.json → server/content.ts → +page.server.ts → component $props()
```

All content loads server-side. Filtering is client-side via `$state()` runes and `$derived()`.

### Filtering (`src/lib/filter.ts`)

- Text search: lowercase + strip diacritics (NFD normalization), all terms must match (AND)
- Filter groups (category, tier, class, nation): OR within a group, AND across groups
- Items with `null` for a filtered field are excluded when that group is active

### Routes

- `/` — Grid homepage with sidebar filters (search, category, tier, class, nation icon toggles)
- `/[slug]` — Detail page with slideshow, download buttons, metadata

### Tailwind CSS 4

`app.css` uses `@import "tailwindcss" source(none)` with explicit `@source "../src"`. This is required because Tailwind's automatic content scanning picks up binary files (`.webp`, `.wotmod`) in `static/content/` and generates invalid CSS. Custom utility classes `.selectable` and `.hide-scrollbar` are defined in `app.css`.

### Types (`src/lib/types.ts`)

Core types: `SkinData`, `FilterState`, `Category`, `TankClass`, `Nation`, `Tier`. Constant arrays (`CATEGORIES`, `TIERS`, `TANK_CLASSES`, `NATIONS`) and icon path helpers (`categoryIcon()`, `tierIcon()`, etc.) for rendering filter UI.
