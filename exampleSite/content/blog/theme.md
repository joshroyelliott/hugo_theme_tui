---
title: "Theme"
date: 2025-01-05
tags: ["palette", "typography"]
summary: "Palette and typography flow from a single data file."
---

Every colour on this site comes from the sixteen CSS custom properties
emitted by `data/colorscheme.yaml`. Swap the YAML, rebuild, done.

## Preview a different palette

Pick a scheme and watch the whole page re-tint in place. Reload to
restore the built-in palette.

{{< theme-selector >}}

## Current palette

{{< palette >}}

To ship your own palette, drop a `data/colorscheme.yaml` in your site
root:

```yaml
name: My Palette
scheme:
  base00: "1F1F28"
  # …
  base0F: "D27E99"
```

Hex values without a leading `#` (standard base16 format).

## Typography

<dl class="info-list">
  <dt>Font family</dt><dd>FiraCode Nerd Font, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace</dd>
  <dt>Base size</dt><dd>15px</dd>
  <dt>Line height</dt><dd>1.6</dd>
</dl>

TTF files ship in `static/fonts/`, loaded with `font-display: swap`.
FiraCode ligatures render in code blocks, and the Nerd Font patches
provide the [icon](/blog/icons/) glyphs used throughout the UI.
