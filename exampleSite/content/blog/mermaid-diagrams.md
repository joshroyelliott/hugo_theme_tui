---
title: "Mermaid Diagrams"
date: 2025-03-15
tags: ["mermaid", "diagrams"]
summary: "Flowcharts and sequences coloured by the site palette."
---

Mermaid is loaded from CDN **only on pages that use it**. The palette is
piped in from the site's base16 colorscheme, so diagrams re-theme
automatically when you swap `data/colorscheme.yaml`.

## Flowchart

```mermaid
flowchart LR
  A[Start] --> B{Ready?}
  B -- yes --> C[Render]
  B -- no --> D[Wait]
  D --> B
  C --> E[Done]
```

## Sequence

```mermaid
sequenceDiagram
  participant Browser
  participant Hugo
  participant Chroma
  Browser->>Hugo: request /blog/syntax-highlighting/
  Hugo->>Chroma: highlight ```go block
  Chroma-->>Hugo: classed <span>s
  Hugo-->>Browser: HTML
```
