// input-panel.js — activation state + textarea auto-resize.
//
// An input panel is `.panel--input` wrapping an `<input>` or `<textarea>`.
// - Clicking anywhere inside focuses the first field.
// - Focus adds `.is-active` (styled border + title), blur removes it.
// - Only one input panel is active at a time.
// - Textareas grow to fit their content.

export function initInputPanels() {
  document.querySelectorAll('.panel--input').forEach(setupPanel);
}

function setupPanel(panel) {
  const inputs = panel.querySelectorAll('input, textarea');
  if (!inputs.length) return;

  panel.addEventListener('click', (e) => {
    if (e.target.matches('input, textarea')) return;
    const first = panel.querySelector('input, textarea');
    if (!first) return;
    first.focus();
    if (first.tagName === 'INPUT') {
      first.selectionStart = first.selectionEnd = first.value.length;
    }
  });

  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      document
        .querySelectorAll('.panel--input.is-active')
        .forEach((p) => p.classList.remove('is-active'));
      panel.classList.add('is-active');
    });
    input.addEventListener('blur', () => {
      if (!panel.contains(document.activeElement)) {
        panel.classList.remove('is-active');
      }
    });

    if (input.tagName === 'TEXTAREA') {
      const resize = () => autosize(input);
      input.addEventListener('input', resize);
      // Run once on load in case the field has initial content.
      resize();
    }
  });
}

function autosize(el) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}
