// main.js — entry point. Conditionally initialises feature modules.
import { initScrollIndicators } from './scroll-indicator.js';
import { initTabs } from './tabs.js';
import { initInputPanels } from './input-panel.js';

initScrollIndicators();
initTabs();
initInputPanels();

// List+preview is only active when both panels exist on the page.
if (document.querySelector('.panel--list') && document.querySelector('.panel--preview')) {
  import('./list-preview.js')
    .then((m) => m.initListPreview())
    .catch((err) => console.error('[tui] list-preview init failed:', err));
}

// 3D viewer: only load three.js when a viewer is on the page.
if (document.querySelector('.tui-model-viewer')) {
  import('./model-viewer.js')
    .then((m) => m.initModelViewers())
    .catch((err) => console.error('[tui] model-viewer init failed:', err));
}
