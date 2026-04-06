// scroll-indicator.js — custom scroll pip on the right edge of scroll panels.
//
// Hugo emits `.js-scroll-indicator` inside list/preview/scroll panels. This
// module sizes and positions the pip based on the scrollable content's
// scrollHeight / clientHeight / scrollTop. It watches for content changes via
// MutationObserver so preview swaps (list-preview.js) refresh the indicator.

export function initScrollIndicators() {
  document.querySelectorAll('.js-scroll-indicator').forEach(attach);
}

function attach(indicator) {
  const panel = indicator.closest('.panel');
  if (!panel) return;
  // The panel itself has overflow:visible so titles can sit on the border;
  // the scroll happens on .panel__content.
  const scroller = panel.querySelector('.panel__content') || panel;

  const update = () => position(scroller, indicator);
  update();

  scroller.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });

  if ('ResizeObserver' in window) {
    new ResizeObserver(update).observe(scroller);
  }
  // Watch content changes — e.g. list-preview swapping innerHTML.
  new MutationObserver(update).observe(scroller, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

function position(scroller, indicator) {
  const total = scroller.scrollHeight;
  const visible = scroller.clientHeight;
  if (total <= visible + 1) {
    indicator.style.display = 'none';
    return;
  }
  indicator.style.display = 'block';
  const pad = 6;
  const usable = Math.max(visible - pad * 2, 0);
  const ratio = visible / total;
  const h = Math.max(30, usable * ratio);
  const maxTop = usable - h;
  const progress = scroller.scrollTop / (total - visible);
  const top = progress * maxTop + pad;
  indicator.style.height = `${h}px`;
  indicator.style.top = `${top}px`;
}
