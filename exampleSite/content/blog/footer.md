---
title: "Footer"
date: 2025-01-12
weight: 4
tags: ["layout", "nav"]
posttype: layout
summary: "Copyright left, social links right, icon-only on mobile."
---

The footer sits at the bottom of every page via `partials/body/footer.html`.
Copyright on the left, social links on the right, separated by `|`.

## Default

<footer class="site-footer" style="margin: 1rem 0; position: static;">
  <div class="site-footer__left">&copy; 2025 Site Title</div>
  <div class="site-footer__right">
    <a href="#"><span class="site-footer__link-text">GitHub</span></a>
    <span class="site-footer__sep">|</span>
    <a href="#"><span class="site-footer__link-text">LinkedIn</span></a>
    <span class="site-footer__sep">|</span>
    <a href="#"><span class="site-footer__link-text">RSS</span></a>
  </div>
</footer>

## With icons

Each link can carry a glyph from `data/icons.yaml`. Below 768px the
text hides, leaving icon-only links.

<footer class="site-footer" style="margin: 1rem 0; position: static;">
  <div class="site-footer__left">&copy; 2025 Your Brand</div>
  <div class="site-footer__right">
    <a href="#"><span class="icon" aria-hidden="true">&#xf09b;</span><span class="site-footer__link-text">GitHub</span></a>
    <span class="site-footer__sep">|</span>
    <a href="#"><span class="icon" aria-hidden="true">&#xf099;</span><span class="site-footer__link-text">Twitter</span></a>
    <span class="site-footer__sep">|</span>
    <a href="#"><span class="icon" aria-hidden="true">&#xf0e0;</span><span class="site-footer__link-text">Email</span></a>
    <span class="site-footer__sep">|</span>
    <a href="#"><span class="icon" aria-hidden="true">&#xf09e;</span><span class="site-footer__link-text">RSS</span></a>
  </div>
</footer>

## Icons only

Drop the link text for a compact row of glyphs.

<footer class="site-footer" style="margin: 1rem 0; position: static;">
  <div class="site-footer__left">&copy; 2025 Portfolio</div>
  <div class="site-footer__right">
    <a href="#"><span class="icon" aria-hidden="true">&#xf09b;</span></a>
    <span class="site-footer__sep">|</span>
    <a href="#"><span class="icon" aria-hidden="true">&#xf08c;</span></a>
    <span class="site-footer__sep">|</span>
    <a href="#"><span class="icon" aria-hidden="true">&#xf0e0;</span></a>
    <span class="site-footer__sep">|</span>
    <a href="#"><span class="icon" aria-hidden="true">&#xf09e;</span></a>
  </div>
</footer>

## Config

Links come from `params.social` in `hugo.toml`:

```toml
[params]
  copyright = "&copy; 2025 tui demo"
  [[params.social]]
    name = "GitHub"
    url = "https://github.com/user"
    icon = "github"
  [[params.social]]
    name = "RSS"
    url = "/index.xml"
    icon = "rss"
```

External URLs open in a new tab; internal URLs (starting with `/`)
stay in-page. Omit `copyright` to default to `© {year} {site.Title}`.
