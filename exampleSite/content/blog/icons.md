---
title: "Icons"
date: 2025-01-08
tags: ["icons", "typography"]
summary: "Nerd Font glyphs looked up by name from a single data file."
---

Icons are Nerd Font glyphs mapped in `data/icons.yaml`. The theme ships
a default set; override by placing your own `data/icons.yaml` in the
site root.

## Usage

```go-html-template
{{ partial "icon.html" "github" }}
{{ partial "icon.html" (dict "name" "search" "class" "icon--lg") }}
```

Unknown names render as the raw codepoint, so you can also pass a
literal hex value.

## Available glyphs

{{< icon-grid >}}

## Adding icons

Add entries to `data/icons.yaml` as `name: codepoint` pairs:

```yaml
docker: f308
kubernetes: fd31
```

Codepoints are hex without a `0x` prefix. Browse available glyphs at
[nerdfonts.com/cheat-sheet](https://www.nerdfonts.com/cheat-sheet).
