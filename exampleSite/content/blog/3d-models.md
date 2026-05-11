---
title: "3D Models"
date: 2025-04-20
weight: 10
tags: ["three.js", "webgl"]
posttype: content
summary: "Lazy-loaded Three.js viewer that reads its colours from the palette."
---

The `model-viewer` shortcode embeds a Three.js scene inside a panel.
Three.js is loaded from jsdelivr via ESM import map &mdash; only on
pages that use it.

Scene colours read from `--base00`, `--base05`, and `--base0D` at init.
A `MutationObserver` on `<html>` keeps them in sync when the palette
changes live.

## Demo scene

No `src` attribute, so this renders a procedural torus-knot + ring
using palette colours. Drag to orbit.

{{< model-viewer title="Demo" height="360" note="drag to orbit" >}}

- Background matches `--base00`.
- Knot is tinted with `--base0B` (green).
- Ring uses `--base0E` (purple).
- Lights blend `--base05` and `--base0D`.

## Loading a model

Pass a `src` URL for a glTF asset:

```go-html-template
{{</* model-viewer src="/models/scene.glb"
                title="Scene"
                height="420" */>}}
```

The Three.js import is memoised, so multiple viewers on one page
download the library once. The camera auto-frames the loaded object's
bounding box.
