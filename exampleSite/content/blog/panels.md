---
title: "Panels"
date: 2025-02-10
tags: ["panels", "layout"]
summary: "Every titled container in the theme is one parametric partial."
---

Every titled container on this site is `partials/panel.html` called with
a different `variant`. Pass a dict with `title`, `number`, `variant`,
and content:

```go-html-template
{{ partial "panel.html" (dict
  "title"   "Posts"
  "number"  1
  "variant" "list"
  "items"   .Pages
) }}
```

## Plain

Freeform HTML in a titled border. Hover to see the border and header
highlight together.

{{< panel-demo variant="" title="About" number="1" content="<p>A titled container with freeform HTML content. The number, separator, and title sit on the top border.</p>" >}}

## List + Preview

A list panel paired with a preview panel. Clicking an item in the list
swaps the preview content without a page navigation.

{{< panel-demo variant="list-preview" >}}

On real section pages (like the blog index) `list-preview.js` fetches
`index.json` once and renders from memory. Without JavaScript the list
items are plain links to the full pages.

## Tabs

Dual-mode: tab switchers in the border when narrow, side-by-side
columns when wide. Resize the window to see both states.

{{< panel-demo variant="tab" title="Tabs" number="3" note="resize window" >}}

## Input

A prompt-style wrapper. The border and title switch to `--base0C` on
focus and the textarea auto-grows as you type.

{{< panel-demo variant="input" title="Script" number="4" note="auto-grows" >}}
