---
title: "Print Stylesheet"
date: 2026-05-11
weight: 12
tags: ["print", "pdf"]
posttype: style
summary: "A sitewide @media print stylesheet — Ctrl+P produces a clean PDF without configuration."
---

Every page of every site built on this theme has a `@media print` rule
set baked in. Press `Ctrl+P` (or `Cmd+P`) and you get a clean,
readable layout suitable for paper or PDF — no `wkhtmltopdf`, no
weasyprint, no per-page configuration.

## What gets stripped

The print rules hide everything that has no value off-screen:

- nav and footer
- filter chips
- scroll indicators
- panel separators
- anything tagged with `.no-print`

## What gets kept

The content survives, slightly reshaped:

- Panel titles become plain bold headings with a thin underline.
- Body text is black on white.
- Absolute (`http`/`https`) links keep their text underlined and gain
  a muted URL after them — so the reader can find the link target
  when the page is on paper.

## Try it

Hit `Ctrl+P` (or `Cmd+P`) on this page, or
[/blog/panels/](/blog/panels/), or
[/blog/post-types-and-filter-chips/](/blog/post-types-and-filter-chips/).
The output is a usable PDF straight from the browser.

## The shape of the file

`_print.scss` wraps everything in `@media print`:

```scss
@media print {
  :root, body { color: #000 !important; background: #fff !important; }

  nav, footer, .filter-chips, .js-scroll-indicator,
  .panel__tabs, .panel__separator, .no-print {
    display: none !important;
  }

  .panel { background: transparent !important; border: none !important; }
  .panel__title { font-size: 1.15rem !important; font-weight: bold !important; }

  a[href^="http"]::after { content: " (" attr(href) ")"; }
}
```

The hex literals are deliberate — print should be black on white
regardless of which palette the screen is using.

{{< panel title="On paper" number="1" note="design intent" >}}
Every TUI-looking site should look readable on paper *without*
per-site configuration. The print stylesheet is sitewide because the
property should hold for blog posts, resumes, about pages, the home —
anywhere the user might hit Ctrl+P.
{{< /panel >}}
