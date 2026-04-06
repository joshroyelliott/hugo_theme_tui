---
title: "Nav"
date: 2025-01-19
tags: ["nav", "layout", "responsive"]
summary: "Chevron-clipped bar with a title tab and link pills."
---

A flex row of `clip-path` chevron shapes. Title tab on the left, menu
pills on the right. No JavaScript.

## Plain

<nav class="site-nav" aria-label="Plain nav demo" style="margin: 1rem 0;">
  <div class="site-nav__inner">
    <a href="#" class="site-nav__title"><span class="site-nav__title-text">Title</span></a>
    <ul class="site-nav__menu">
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="site-nav__link-text">Home</span></a></li>
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="site-nav__link-text">Blog</span></a></li>
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="site-nav__link-text">About</span></a></li>
    </ul>
  </div>
</nav>

## With icons

Title icon from `site.Params.titleIcon`; link icons from each menu
entry's `params.icon`.

<nav class="site-nav" aria-label="Icon nav demo" style="margin: 1rem 0;">
  <div class="site-nav__inner">
    <a href="#" class="site-nav__title">
      <span class="icon site-nav__icon" aria-hidden="true">&#xf120;</span>
      <span class="site-nav__title-text">tui</span>
    </a>
    <ul class="site-nav__menu">
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="icon site-nav__icon" aria-hidden="true">&#xf015;</span><span class="site-nav__link-text">Home</span></a></li>
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="icon site-nav__icon" aria-hidden="true">&#xf15c;</span><span class="site-nav__link-text">Blog</span></a></li>
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="icon site-nav__icon" aria-hidden="true">&#xf07b;</span><span class="site-nav__link-text">Projects</span></a></li>
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="icon site-nav__icon" aria-hidden="true">&#xf007;</span><span class="site-nav__link-text">About</span></a></li>
    </ul>
  </div>
</nav>

## Active state

Current section gets `--base0B`. Hover any pill to see `--base0C`.

<nav class="site-nav" aria-label="Active nav demo" style="margin: 1rem 0;">
  <div class="site-nav__inner">
    <a href="#" class="site-nav__title"><span class="icon site-nav__icon" aria-hidden="true">&#xf005;</span><span class="site-nav__title-text">Demo</span></a>
    <ul class="site-nav__menu">
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="site-nav__link-text">Home</span></a></li>
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="site-nav__link-text">Projects</span></a></li>
      <li class="site-nav__item"><a href="#" class="site-nav__link is-active"><span class="site-nav__link-text">Blog</span></a></li>
      <li class="site-nav__item"><a href="#" class="site-nav__link"><span class="site-nav__link-text">About</span></a></li>
    </ul>
  </div>
</nav>

## Responsive

<dl class="info-list">
  <dt>992px</dt><dd>Pill padding shrinks.</dd>
  <dt>768px</dt><dd>Link text hides, leaving icon-only pills. Overflows scroll horizontally.</dd>
</dl>

Resize this window to see both states.

## Config

```toml
[params]
  titleIcon = "terminal"

[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 10
    [menu.main.params]
      icon = "home"
  [[menu.main]]
    name = "Blog"
    url = "/blog/"
    weight = 20
    [menu.main.params]
      icon = "document"
```
