---
title: "Layouts"
date: 2025-01-22
tags: ["layout", "grid"]
summary: "Page skeleton and a small family of responsive grid classes."
---

Every page is `nav` + `main` + `footer` inside a centred `.container`
(max 1500px). `main` holds either a single panel or a grid of panels.

## Grid classes

All grids collapse to a single column at 768px.

### `.grid-2col`

<div class="grid-2col">
  <div class="panel"><div class="panel__content"><p>Left column.</p></div></div>
  <div class="panel"><div class="panel__content"><p>Right column.</p></div></div>
</div>

### `.grid-3col`

Collapses to two columns at 992px, then one at 768px.

<div class="grid-3col">
  <div class="panel"><div class="panel__content"><p>One</p></div></div>
  <div class="panel"><div class="panel__content"><p>Two</p></div></div>
  <div class="panel"><div class="panel__content"><p>Three</p></div></div>
</div>

### `.grid-main-sidebar`

<div class="grid-main-sidebar">
  <div class="panel"><div class="panel__header"><span class="panel__title">Sidebar</span></div><div class="panel__content"><p>1fr.</p></div></div>
  <div class="panel"><div class="panel__header"><span class="panel__title">Main</span></div><div class="panel__content"><p>2fr.</p></div></div>
</div>

### `.grid-auto-fit`

As many 300px-min columns as the container allows.

<div class="grid-auto-fit">
  <div class="panel"><div class="panel__content"><p>Card</p></div></div>
  <div class="panel"><div class="panel__content"><p>Card</p></div></div>
  <div class="panel"><div class="panel__content"><p>Card</p></div></div>
  <div class="panel"><div class="panel__content"><p>Card</p></div></div>
</div>

### `.grid-master-stack`

<div class="grid-master-stack">
  <div class="panel"><div class="panel__header"><span class="panel__title">Master</span></div><div class="panel__content"><p>2fr.</p></div></div>
  <div class="stack">
    <div class="panel"><div class="panel__content"><p>Stack 1</p></div></div>
    <div class="panel"><div class="panel__content"><p>Stack 2</p></div></div>
    <div class="panel"><div class="panel__content"><p>Stack 3</p></div></div>
  </div>
</div>

### `.grid-monocle`

<div class="grid-monocle">
  <div class="panel"><div class="panel__header"><span class="panel__title">Full-width</span></div><div class="panel__content"><p>Single-column grid with consistent gap.</p></div></div>
  <div class="panel"><div class="panel__content"><p>Second panel.</p></div></div>
</div>

## Special-case grids

- `.grid-list-preview` &mdash; blog and taxonomy lists. Scrollable
  title list (300px min) + preview pane (2fr).
- `.home-grid` &mdash; homepage. 2fr intro + 1fr recent posts.
