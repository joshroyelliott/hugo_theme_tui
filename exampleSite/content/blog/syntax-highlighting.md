---
title: "Syntax Highlighting"
date: 2025-01-05
weight: 7
tags: ["chroma", "code"]
summary: "Code blocks coloured via Chroma, mapped to the base16 palette."
---

Chroma emits CSS classes (the theme sets `markup.highlight.noClasses = false`),
and `_chroma.scss` maps those classes to `var(--base0E)`, `var(--base0B)`,
`var(--base09)`, and friends. Swap the site's `data/colorscheme.yaml` and
every token colour updates in lock-step with the rest of the page.

## <span class="icon" aria-hidden="true">&#xe627;</span> Go

```go
package main

import "fmt"

// greet prints a welcome message.
func greet(name string) {
    fmt.Printf("Hello, %s!\n", name)
}

func main() {
    greet("world")
}
```

## <span class="icon" aria-hidden="true">&#xe73c;</span> Python

```python
def fib(n):
    """Return the n-th Fibonacci number."""
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

## <span class="icon" aria-hidden="true">&#xe7a8;</span> Rust

```rust
use std::collections::HashMap;

fn count_words(text: &str) -> HashMap<&str, usize> {
    let mut counts = HashMap::new();
    for word in text.split_whitespace() {
        *counts.entry(word).or_insert(0) += 1;
    }
    counts
}
```

## <span class="icon" aria-hidden="true">&#xf120;</span> Shell

```bash
# Build and serve the example site
hugo server --themesDir ../.. \
  --navigateToChanged \
  --noHTTPCache
```

## Inline & prose

You can also drop `inline code` into a paragraph — it uses `var(--base0A)` on
the `var(--base01)` surface, so it stands out without clashing. External
links like [Hugo's docs](https://gohugo.io/) open in a new tab via the
`render-link.html` hook; internal links stay in-page.

> "The purpose of computing is insight, not numbers." — Richard Hamming

## Tables

| Lang | Stable | Year |
|------|--------|------|
| Go   | yes    | 2012 |
| Rust | yes    | 2015 |
| Zig  | no     | 2016 |
