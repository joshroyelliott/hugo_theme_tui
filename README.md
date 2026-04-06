# tui — Hugo theme

A terminal-UI flavoured Hugo theme: base16-coloured TUI panels with titles
sitting on the border, FiraCode Nerd Font, master-detail list+preview pages,
and a palette-driven colour system that re-themes every surface (panels,
syntax highlighting, mermaid diagrams, 3D viewers) from a single file.

## Quick start

```bash
# As a git submodule
git submodule add https://github.com/you/tui.git themes/tui

# Then in your site's hugo.toml
theme = "tui"
```

Opt into the theme's markup defaults (Hugo's default strategy is `none`):

```toml
[markup]
  _merge = "deep"
```

And register the `previewindex` output on sections you want to use for the
master-detail list/preview layout:

```toml
[outputs]
  section = ["html", "rss", "previewindex"]
  term    = ["html", "rss", "previewindex"]
```

## Colour palette

The theme ships with Tokyo Night Storm as the default, defined in
`data/colorscheme.yaml`. Override it by creating a file of the same name in
your site root:

```yaml
# data/colorscheme.yaml
name: Gruvbox Dark Medium
author: morhetz
scheme:
  base00: "282828"
  base01: "3c3836"
  base02: "504945"
  base03: "665c54"
  base04: "bdae93"
  base05: "d5c4a1"
  base06: "ebdbb2"
  base07: "fbf1c7"
  base08: "fb4934"
  base09: "fe8019"
  base0A: "fabd2f"
  base0B: "b8bb26"
  base0C: "8ec07c"
  base0D: "83a598"
  base0E: "d3869b"
  base0F: "d65d0e"
```

Hex values use **no leading `#`**, matching the base16-schemes YAML spec. On
build, these values are emitted as CSS custom properties (`--base00` …
`--base0F`) in an inline `<style>` block before the stylesheet, so they're
ready for first paint and accessible to JavaScript.

## Panels

Every titled container in the theme is the same parametric partial:

```go-html-template
{{ partial "panel.html" (dict
  "title"   "Posts"
  "number"  1
  "variant" "list"
  "items"   site.RegularPages
) }}
```

Supported `variant` values: `""` (plain), `list`, `preview`, `tab`, `input`.
See `exampleSite/layouts/showcase.html` for a live demo of every variant.

## Master-detail list/preview

List pages (`layouts/_default/list.html`, `layouts/term.html`) render two
panels side by side: a list of items and a preview pane. On page load,
`list-preview.js` fetches `index.json` (emitted by the custom `previewindex`
output format) once and uses it as an in-memory lookup, so clicking an item
swaps the preview contents without a network round-trip.

The list items remain real `<a>` links, so when JS is disabled they
navigate to the full page like any other link.

## Syntax highlighting

Chroma emits CSS classes (via `markup.highlight.noClasses = false` in the
theme's `hugo.toml`), which `_chroma.scss` maps to the base16 palette. This
means code blocks re-theme automatically alongside everything else.

## Mermaid

Mermaid loads from CDN **only on pages that use it**. Add a `mermaid` code
fence and the render hook flips a per-page flag that `scripts-end.html`
reads to conditionally inject the script. Diagram colours are passed via
`themeVariables` pulled from the base16 palette.

## 3D model viewer

The `model-viewer` shortcode lazy-loads Three.js from jsdelivr only on pages
that embed a viewer. Scene background and lights read from `--base00`,
`--base05`, `--base0D`, and a `MutationObserver` on `<html>` will re-theme
the scene if the palette changes live.

```hugo
{{< model-viewer src="/models/scene.glb" title="Scene" height="420" >}}
```

## Development

The theme is built using Hugo's `js.Build` (ESM bundling) and Dart Sass. On
NixOS a flake is provided:

```bash
cd themes/tui      # or wherever you cloned it
nix develop
cd exampleSite
hugo server --themesDir ../.. --navigateToChanged --noHTTPCache
```

## License

MIT
