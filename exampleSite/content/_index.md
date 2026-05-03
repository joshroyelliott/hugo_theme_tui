---
title: "tui"
profileImage: "/images/silhouette.svg"
profileColor: "base0D"
bio:
  - key: "Name"
    val: "Sam Nakamura"
  - key: "Role"
    val: "Software Engineer"
  - key: "Location"
    val: "Portland, OR"
  - key: "Focus"
    val: "Systems programming, CLI tools"
  - key: "Status"
    val: "Building developer tools at Acme Corp"
---

A terminal-inspired Hugo theme driven by a single
[base16](https://github.com/tinted-theming/schemes) palette.

<div style="display:flex; flex-wrap:wrap; gap:1.5rem; align-items:center; margin:1.5rem 0;">
  {{< tinted-image src="/images/terminal.svg" color="base0D" alt="Terminal" width="48px" height="48px" >}}
  {{< tinted-image src="/images/code.svg"     color="base0B" alt="Code"     width="48px" height="48px" >}}
  {{< tinted-image src="/images/gear.svg"     color="base09" alt="Config"   width="48px" height="48px" >}}
  {{< tinted-image src="/images/globe.svg"    color="base0C" alt="Web"      width="48px" height="48px" >}}
  {{< tinted-image src="/images/heart.svg"    color="base08" alt="Heart"    width="48px" height="48px" >}}
</div>

## What's here

- [Panel system](/blog/panels/) — titled, numbered containers with scroll indicators
- [Responsive layouts](/blog/layouts/) — grid classes that collapse to a single column
- [Syntax highlighting](/blog/syntax-highlighting/) — Chroma tokens mapped to the palette
- [Tinted images](/blog/tinted-images/) — monochrome SVGs recoloured via CSS masks
- [Mermaid diagrams](/blog/mermaid-diagrams/) — flowcharts and sequence diagrams in palette colours
- [3D models](/blog/3d-models/) — Three.js viewer tinted to match

```yaml
# data/colorscheme.yaml
name: Kanagawa
scheme:
  base00: "1F1F28"  # background
  base05: "DCD7BA"  # foreground
  base0D: "7E9CD8"  # accent
```
