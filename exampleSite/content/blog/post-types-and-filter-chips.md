---
title: "Post Types and Filter Chips"
date: 2026-05-11
weight: 11
tags: ["lists", "filter", "preview"]
posttype: layout
summary: "One front-matter field opts a post into the colour-coded list + filter-chip system."
---

A post's `posttype` is looked up in `site.Data.posttypes` at render time.
If the type is registered, the post earns a colour-coded marker in the
master-detail list, a hover state that matches its type, a filter chip
at the top of the section list, and a preview panel that adopts its
colour when selected.

## Opting in

Add a single line of front matter:

```yaml
---
title: "My post"
posttype: layout
---
```

The value of `posttype` is the key of an entry in `data/posttypes.yaml`.
Unrecognised values are ignored — the post renders untyped, no marker,
no chip affinity.

## The registry

The theme ships a default registry at `data/posttypes.yaml`. Sites
override it by placing their own file. This site uses:

```yaml
layout:
  label: "Layout"
  color: "base0D"
style:
  label: "Style"
  color: "base0E"
content:
  label: "Content"
  color: "base0B"
```

Each entry needs a `label` (shown in chips and the preview note) and a
`color` (a base16 slot name — `base08` through `base0F` for accents).

## Where the colour shows up

A typed post threads its colour through several places at once:

- An inline `●` before the title in the master-detail list.
- The link colour and the left accent bar both light up on hover.
- A filter chip at the top of the section list (one per registered type).
- The preview panel border, `[N]` number, title text, and top-right
  `(Label)` note when the post is loaded.

The result: scanning a section list shows category at a glance, and
clicking through carries the colour into the preview chrome — you
always know what kind of post you're reading.

## Filter chips

Filter chips appear automatically on any section whose pages include
registered types. Brackets sit in a muted foreground colour; the mark
inside shows the type colour when active and hides via `visibility`
when toggled off (so chip widths don't shift). Labels dim to a faint
grey when inactive.

Multi-select. Click `All` to reset. State persists to `localStorage`
under `tui:filter:<section>`, so the next page load remembers what you
last had visible.

## Where to look on this site

Scroll back to [/blog/](/blog/) and play with the chips. The
colour-coded preview-panel chrome means you don't need to read the
chip row to know which type you're looking at — the colour is
everywhere it needs to be.

{{< panel title="Data flow" number="1" >}}
**Front matter** → `posttype: layout`

**Template** (`panel.html`) — looks the key up in `site.Data.posttypes`;
on match, emits `data-posttype`, `data-posttype-label`, and an inline
style setting `--posttype-color`.

**CSS** — the marker, hover state, chip, and preview chrome all read
`var(--posttype-color)` (with a fallback to `var(--base0B)` for untyped).

**JS** (`list-preview.js`) — when an item becomes active, reads its
`--posttype-color` and sets `--preview-accent` on the preview panel,
so the panel's hover/active rules pick up the type colour.
{{< /panel >}}
