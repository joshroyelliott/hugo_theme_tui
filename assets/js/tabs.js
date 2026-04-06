// tabs.js — tab-panel switching, responsive column mode, keyboard nav.
//
// A tab panel is `.panel--tab` containing `.panel__tab` headers (in the panel
// border) and matching `.panel__tab-content` bodies. Clicking a header
// activates its body. When the panel carries `.js-check-width`, it also
// watches its own width and toggles `.panel--wide-enough` once there's enough
// room to show every tab side-by-side (CSS then hides the headers and shows
// all bodies as columns).

const COLUMN_MIN_WIDTH = 280;

export function initTabs() {
  document.querySelectorAll('.panel--tab').forEach(setupPanel);
}

function setupPanel(panel) {
  const tabs = Array.from(panel.querySelectorAll('.panel__tab'));
  if (!tabs.length) return;

  tabs.forEach((tab, i) => {
    // Expose as button semantics for assistive tech.
    tab.setAttribute('role', 'tab');
    tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
    tab.addEventListener('click', () => activate(panel, tab, tabs));
    tab.addEventListener('keydown', (e) => handleKey(e, panel, tabs));
  });

  if (panel.classList.contains('js-check-width')) {
    setupWidthCheck(panel, tabs.length);
  }
}

function activate(panel, tab, tabs) {
  // In wide-enough mode the headers are hidden; activation is a no-op.
  if (panel.classList.contains('panel--wide-enough')) return;
  const id = tab.getAttribute('data-tab-id');
  if (!id) return;

  tabs.forEach((t) => {
    const active = t === tab;
    t.classList.toggle('panel__tab--active', active);
    t.setAttribute('tabindex', active ? '0' : '-1');
    t.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  panel.querySelectorAll('.panel__tab-content').forEach((c) => {
    c.classList.toggle('panel__tab-content--active', c.id === id);
  });
}

function handleKey(e, panel, tabs) {
  const current = tabs.findIndex((t) => t.classList.contains('panel__tab--active'));
  if (current < 0) return;
  let next = current;
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      next = (current - 1 + tabs.length) % tabs.length;
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      next = (current + 1) % tabs.length;
      break;
    case 'Home':
      next = 0;
      break;
    case 'End':
      next = tabs.length - 1;
      break;
    default:
      return;
  }
  e.preventDefault();
  activate(panel, tabs[next], tabs);
  tabs[next].focus();
}

function setupWidthCheck(panel, tabCount) {
  const threshold = tabCount * COLUMN_MIN_WIDTH;
  const check = () => {
    const wide = panel.clientWidth >= threshold;
    panel.classList.toggle('panel--wide-enough', wide);
  };
  check();
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(check);
    ro.observe(panel);
  } else {
    window.addEventListener('resize', check);
  }
}
