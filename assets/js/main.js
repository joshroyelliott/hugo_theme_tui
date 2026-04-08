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

// Re-initialise interactive features inside dynamically injected preview content.
document.addEventListener('preview:load', (e) => {
  const root = e.target;
  initTabs(root);
  initInputPanels(root);

  // 3D viewers — lazy-load three.js only when needed.
  if (root.querySelector('.tui-model-viewer')) {
    import('./model-viewer.js')
      .then((m) => m.initModelViewers(root))
      .catch((err) => console.error('[tui] model-viewer preview init failed:', err));
  }

  // Mermaid diagrams — dynamically import from CDN when preview contains them.
  // Initialise with the same base16 theme variables used in scripts-end.html
  // so previewed diagrams match the full-page appearance.
  const mermaidNodes = root.querySelectorAll('pre.mermaid');
  if (mermaidNodes.length) {
    import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
      .then((m) => {
        const styles = getComputedStyle(document.documentElement);
        const c = (n) => styles.getPropertyValue(n).trim();
        m.default.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeVariables: {
            darkMode: true,
            background: c('--base00'),
            primaryColor: c('--base0D'),
            primaryTextColor: c('--base00'),
            primaryBorderColor: c('--base04'),
            secondaryColor: c('--base0E'),
            secondaryTextColor: c('--base00'),
            secondaryBorderColor: c('--base04'),
            tertiaryColor: c('--base0C'),
            tertiaryTextColor: c('--base00'),
            tertiaryBorderColor: c('--base04'),
            lineColor: c('--base05'),
            textColor: c('--base05'),
            edgeLabelBackground: c('--base01'),
            labelTextColor: c('--base05'),
            relationLabelColor: c('--base05'),
            noteBkgColor: c('--base02'),
            noteTextColor: c('--base05'),
            noteBorderColor: c('--base04'),
            activationBkgColor: c('--base03'),
            activationBorderColor: c('--base04'),
            errorBkgColor: c('--base08'),
            errorTextColor: c('--base00'),
            taskBkgColor: c('--base0D'),
            taskTextColor: c('--base00'),
            taskTextOutsideColor: c('--base05'),
            activeTaskBkgColor: c('--base0B'),
            activeTaskBorderColor: c('--base0B'),
            doneTaskBkgColor: c('--base04'),
            doneTaskBorderColor: c('--base04'),
            critBkgColor: c('--base08'),
            critBorderColor: c('--base08'),
            sectionBkgColor: c('--base01'),
            sectionBkgColor2: c('--base02'),
            gridColor: c('--base02'),
            todayLineColor: c('--base08'),
          },
        });
        m.default.run({ nodes: Array.from(mermaidNodes) });
      })
      .catch((err) => console.error('[tui] mermaid preview init failed:', err));
  }
});
