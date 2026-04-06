---
title: "Tinted Images"
date: 2025-01-10
tags: ["palette", "images"]
summary: "Monochrome images tinted to any base16 colour with CSS mask-image."
---

The `tinted-image` shortcode recolours monochrome images (SVG, PNG) to
any palette slot using CSS `mask-image`. No JavaScript, no
approximation — the colour is an exact CSS custom property.

## Single colour

{{< tinted-image src="/images/terminal.svg" color="base0D" alt="Terminal" width="64px" height="64px" >}}

```go-html-template
{{</* tinted-image src="/images/terminal.svg" color="base0D" width="64px" height="64px" */>}}
```

## Palette sampler

The same image in every accent colour:

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center; margin:1rem 0;">
  {{< tinted-image src="/images/terminal.svg" color="base08" alt="Red"    width="48px" height="48px" >}}
  {{< tinted-image src="/images/terminal.svg" color="base09" alt="Orange" width="48px" height="48px" >}}
  {{< tinted-image src="/images/terminal.svg" color="base0A" alt="Yellow" width="48px" height="48px" >}}
  {{< tinted-image src="/images/terminal.svg" color="base0B" alt="Green"  width="48px" height="48px" >}}
  {{< tinted-image src="/images/terminal.svg" color="base0C" alt="Cyan"   width="48px" height="48px" >}}
  {{< tinted-image src="/images/terminal.svg" color="base0D" alt="Blue"   width="48px" height="48px" >}}
  {{< tinted-image src="/images/terminal.svg" color="base0E" alt="Purple" width="48px" height="48px" >}}
  {{< tinted-image src="/images/terminal.svg" color="base0F" alt="Brown"  width="48px" height="48px" >}}
</div>

## Different shapes

Any monochrome image works — opaque pixels become the tinted colour,
transparent pixels stay transparent.

<div style="display:flex; flex-wrap:wrap; gap:1.5rem; align-items:center; margin:1rem 0;">
  {{< tinted-image src="/images/code.svg"   color="base0B" alt="Code"   width="56px" height="56px" >}}
  {{< tinted-image src="/images/gear.svg"   color="base09" alt="Gear"   width="56px" height="56px" >}}
  {{< tinted-image src="/images/globe.svg"  color="base0C" alt="Globe"  width="56px" height="56px" >}}
  {{< tinted-image src="/images/heart.svg"  color="base08" alt="Heart"  width="56px" height="56px" >}}
</div>

## How it works

The image acts as an alpha mask on a coloured `<div>`:

```css
.tinted-image {
  background-color: var(--base0D);
  mask-image: url('/images/logo.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
}
```

Opaque pixels → colour shows. Transparent pixels → nothing renders.
Swap the palette and every tinted image updates instantly.

## Parameters

<dl class="info-list">
  <dt><code>src</code></dt><dd>Path to a monochrome image (required)</dd>
  <dt><code>color</code></dt><dd>Base16 slot name, e.g. <code>base0D</code> (default: <code>base0D</code>)</dd>
  <dt><code>alt</code></dt><dd>Accessible label</dd>
  <dt><code>width</code></dt><dd>CSS width (default: <code>auto</code>)</dd>
  <dt><code>height</code></dt><dd>CSS height (default: <code>auto</code>)</dd>
</dl>

Best results with images that are solid white (or any opaque colour) on
a transparent background. SVGs work perfectly; PNGs need an alpha channel.
