---
title: "tui"
---

Welcome to the **tui** theme demo site. Every surface you see — panels, code
blocks, diagrams — is coloured from a single base16 palette stored in
`data/colorscheme.yaml`.

## Try it

Swap `exampleSite/data/colorscheme.yaml` with any other base16 scheme
(Gruvbox, Nord, Catppuccin…) and rebuild. No component-level changes are
required.

## Browse

- [Blog](/blog/) — posts rendered in a master-detail list/preview layout.
  Each one is a self-referential showcase of a theme feature.
- [About](/about/) — a single-page example.

## Under the hood

Colours are injected into `<head>` as CSS custom properties before the
stylesheet loads, so vars are available on first paint. Chroma syntax
highlighting, mermaid diagrams, and the 3D model viewer all read from the
same variables, which means you get a consistent palette everywhere.
