---
title: "Panels"
date: 2025-02-10
weight: 1
tags: ["panels", "layout"]
posttype: layout
summary: "Every titled container in the theme is one parametric partial."
---

Every titled container on this site is `partials/panel.html` called with
a different `variant`. Pass a dict with `title`, `number`, `variant`,
and content:

```go-html-template
{{ partial "panel.html" (dict
  "title"   "Posts"
  "variant" "list"
  "items"   .Pages
) }}
```

## Plain

Freeform HTML in a titled border. Hover to see the border and header
highlight together.

{{< panel-demo variant="" title="About" content="<p>A titled container with freeform HTML content. The title sits on the top border.</p>" >}}

## From markdown

The `{{</* panel */>}}` shortcode is a markdown wrapper around the same partial.
Same args, but you can write the body as markdown — Chroma highlighting,
link rendering, inline emphasis, fenced code blocks all work as in the
rest of the page.

Named args (all optional except where the underlying partial requires them):
`title`, `number`, `note`, `variant`, `count`, `scroll`, `classes`, `id`.

```markdown
{{</* panel title="From markdown" number="42" note="self-demo" */>}}
Inner body rendered as **markdown** — `inline code`, [links](/),
and a code fence work as usual.
{{</* /panel */>}}
```

And here it is rendered for real:

{{< panel title="From markdown" number="42" note="self-demo" >}}
Inner body rendered as **markdown** — `inline code`, [links](/),
and a code fence work as usual.
{{< /panel >}}

The inner body goes through the page's normal markdown pipeline, so
Chroma highlighting and link rendering work without any extra wiring.

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

{{< panel-demo variant="tab" title="Tabs" note="resize window" >}}

## Input

A prompt-style wrapper. The border and title switch to `--base0C` on
focus and the textarea auto-grows as you type.

{{< panel-demo variant="input" title="Script" note="auto-grows" >}}
