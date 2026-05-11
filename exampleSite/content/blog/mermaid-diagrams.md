---
title: "Mermaid Diagrams"
date: 2025-03-15
weight: 9
tags: ["mermaid", "diagrams"]
posttype: content
summary: "Flowcharts, sequences, and more — coloured by the site palette."
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

## State

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Review : submit
  Review --> Published : approve
  Review --> Draft : revise
  Published --> Archived : expire
  Archived --> [*]
```

## Entity Relationship

```mermaid
erDiagram
  SITE ||--o{ PAGE : contains
  PAGE ||--o{ TAG : "tagged with"
  PAGE ||--|| SECTION : "belongs to"
  SITE ||--o{ MENU : defines
```

## Gantt

```mermaid
gantt
  title Release Plan
  dateFormat YYYY-MM-DD
  section Design
    Wireframes       :done,  d1, 2025-01-01, 14d
    Colour palette   :done,  d2, after d1, 7d
  section Build
    Layouts          :active, b1, after d2, 21d
    JS interactivity :        b2, after b1, 14d
  section Launch
    Testing          :        l1, after b2, 7d
    Deploy           :        l2, after l1, 2d
```
