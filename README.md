# tui

A terminal-UI Hugo theme. One base16 palette colours every surface — panels,
syntax highlighting, mermaid diagrams, tinted images, and 3D model viewers.
Swap a single YAML file and the entire site re-themes.

<!-- screenshot / demo link -->
<!-- ![tui theme screenshot](https://...) -->
<!-- **[Live demo](https://...)** -->

## Features

| | |
|---|---|
| **Panel system** | A single parametric partial powers every titled container — plain, list, tab, preview, and input variants |
| **Master-detail pages** | List pages render a scrollable item list beside a preview pane, backed by an in-memory JSON index — no round-trips |
| **Base16 palette** | 16 colour slots injected as CSS custom properties before first paint; every component reads from them |
| **Syntax highlighting** | Chroma CSS classes mapped to palette slots — code blocks re-theme automatically |
| **Tinted images** | Monochrome SVGs/PNGs recoloured to any palette slot via CSS `mask-image` |
| **Mermaid diagrams** | Loaded from CDN only on pages that use a `mermaid` code fence; diagram colours follow the palette |
| **3D model viewer** | Three.js lazy-loaded per-page; scene colours read from palette variables and live-update on theme change |
| **Nerd Font icons** | 58 glyphs mapped by name in `data/icons.yaml` — no icon font to load, just Unicode codepoints |
| **Responsive** | Grid layouts collapse to single-column on small screens; nav shrinks to icon-only pills |

## Quick start

### 1. Install

```bash
git submodule add https://github.com/joshroyelliott/hugo-theme-tui.git themes/tui
```

### 2. Configure

```toml
# hugo.toml
theme = "tui"

# Opt into the theme's markup defaults (Chroma classes, TOC, goldmark unsafe).
# Hugo's default merge strategy is "none", so this is required.
[markup]
  _merge = "deep"

# Register the previewindex output for master-detail list/preview pages.
[outputs]
  section = ["html", "rss", "previewindex"]
  term    = ["html", "rss", "previewindex"]
```

### 3. Run

```bash
hugo server
```

## Configuration

### Colour palette

The theme reads `data/colorscheme.yaml` — a standard
[base16](https://github.com/tinted-theming/schemes) scheme file. Hex values
use no leading `#`.

```yaml
# data/colorscheme.yaml
name: Kanagawa
scheme:
  base00: "1F1F28"  # default background
  base01: "16161D"  # lighter background
  base02: "223249"  # selection
  base03: "54546D"  # comments
  base04: "727169"  # dark foreground
  base05: "DCD7BA"  # default foreground
  base06: "C8C093"  # light foreground
  base07: "717C7C"  # light background
  base08: "C34043"  # red
  base09: "FFA066"  # orange
  base0A: "C0A36E"  # yellow
  base0B: "76946A"  # green
  base0C: "6A9589"  # cyan
  base0D: "7E9CD8"  # blue
  base0E: "957FB8"  # purple
  base0F: "D27E99"  # magenta
```

Drop in any base16 scheme (Gruvbox, Nord, Catppuccin, Dracula, etc.) and
rebuild. Values are emitted as CSS custom properties (`--base00` through
`--base0F`) in an inline `<style>` block before the stylesheet, so they're
available on first paint and accessible to JavaScript.

### Navigation

```toml
[params]
  titleIcon = "terminal"     # Nerd Font icon beside the site title

[menu]
  [[menu.main]]
    name = "Blog"
    url = "/blog/"
    weight = 10
    [menu.main.params]
      icon = "document"      # optional icon from data/icons.yaml
```

### Footer

```toml
[params]
  copyright = "&copy; 2025 Your Name"   # omit for auto "© year site.Title"

  [[params.social]]
    name = "GitHub"
    url  = "https://github.com/you"
    icon = "github"
  [[params.social]]
    name = "RSS"
    url  = "/index.xml"
    icon = "rss"
```

### SEO / meta

```toml
[params]
  description = "Site description for meta tags"
  author      = "Your Name"
  ogImage     = "/images/og.png"         # fallback Open Graph image
  twitter     = "yourhandle"             # without the @
  favicon     = "/favicon.ico"           # default
```

### Home page profile

The home layout optionally renders a profile sidebar when `bio` front matter
is present in `content/_index.md`:

```yaml
# content/_index.md
---
title: "site name"
profileImage: "/images/silhouette.svg"
profileColor: "base0D"
bio:
  - key: "Name"
    val: "Your Name"
  - key: "Role"
    val: "Software Engineer"
  - key: "Location"
    val: "City, ST"
---
```

Omit the `bio` field to get the default two-panel layout (intro + recent posts).

## Panels

Every titled container is the same parametric partial:

```go-html-template
{{ partial "panel.html" (dict
  "title"   "Posts"
  "number"  1
  "variant" "list"
  "items"   site.RegularPages
) }}
```

| Parameter | Type | Description |
|---|---|---|
| `title` | string | Panel title |
| `number` | int | Shown as `[N]` before the title |
| `note` | string | Floated top-right |
| `count` | string | Floated bottom-right (list counter) |
| `variant` | string | `""`, `list`, `preview`, `tab`, `input` |
| `scroll` | bool | Show scroll indicator |
| `content` | HTML | Body content (plain / preview / input variants) |
| `items` | Pages | Page collection (list variant) |
| `tabs` | []dict | `{title, content}` pairs (tab variant) |

## Shortcodes

### tinted-image

Recolours a monochrome image to any palette slot using CSS `mask-image`.

```go-html-template
{{< tinted-image src="/images/icon.svg" color="base0D" alt="Icon" width="64" height="64" >}}
```

| Parameter | Default | Description |
|---|---|---|
| `src` | *required* | Path to a monochrome image |
| `color` | `base0D` | Base16 slot name |
| `alt` | | Accessible label |
| `width` | `auto` | CSS width |
| `height` | `auto` | CSS height |

### model-viewer

Embeds a 3D model in a TUI panel. Lazy-loads Three.js only on pages that use it.

```go-html-template
{{< model-viewer src="/models/scene.glb" title="Scene" height="420" >}}
{{< model-viewer title="Demo" >}}  {{/* omit src for a procedural demo scene */}}
```

| Parameter | Default | Description |
|---|---|---|
| `src` | | Path to a `.glb` / `.gltf` file; omit for demo scene |
| `title` | `Model` | Panel title |
| `height` | `400` | Viewport height in pixels |
| `note` | | Small label floated top-right |

## Icons

58 Nerd Font glyphs mapped by name in `data/icons.yaml`. Use them in templates:

```go-html-template
{{ partial "icon.html" "github" }}
```

Override or extend by creating your own `data/icons.yaml`.

## Development

The theme uses Hugo's `js.Build` (ESM bundling) and Dart Sass. A Nix flake is
provided:

```bash
nix develop
hugo server -s exampleSite --themesDir ../.. --navigateToChanged --noHTTPCache
```

Requires Hugo >= 0.128.0.

## License

[MIT](LICENSE) — Josh Elliott
