// filter-chips.js — multi-select filter chips with localStorage persistence.
// Activates on any element matching `.filter-chips`.
//
// Behaviour:
//   - "All" chip toggles every type chip on (and is itself active when all are on).
//   - Type chips toggle individually; aria-pressed reflects state.
//   - Active set is written to localStorage[data-storage-key] as a JSON array.
//   - On load, state is restored from localStorage if present.
//   - Filtering: items inside #data-target with [data-posttype] are hidden when
//     their type is not in the active set. Untyped items are always visible.

export function initFilterChips(root = document) {
  const containers = root.querySelectorAll('.filter-chips');
  containers.forEach(setupContainer);
}

function setupContainer(container) {
  const storageKey = container.dataset.storageKey;
  const targetId = container.dataset.target;
  const target = document.getElementById(targetId);
  if (!target) return;

  const typeChips = Array.from(container.querySelectorAll('[data-chip]'));
  const allChip = container.querySelector('[data-chip-all]');
  const allTypes = typeChips.map((c) => c.dataset.chip);

  // Restore persisted state.
  let active = new Set(allTypes);
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) active = new Set(parsed.filter((t) => allTypes.includes(t)));
    }
  } catch (e) {
    // Corrupt state — ignore and use default (all active).
  }

  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(active)));
    } catch (e) {
      // Quota / private mode — silently ignore.
    }
  }

  function render() {
    typeChips.forEach((chip) => {
      const on = active.has(chip.dataset.chip);
      chip.classList.toggle('is-active', on);
      chip.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const allOn = active.size === allTypes.length;
    allChip.classList.toggle('is-active', allOn);
    allChip.setAttribute('aria-pressed', allOn ? 'true' : 'false');

    // Apply filter to target items.
    target.querySelectorAll('[data-posttype]').forEach((item) => {
      const type = item.dataset.posttype;
      const visible = active.has(type);
      item.style.display = visible ? '' : 'none';
    });
  }

  typeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const t = chip.dataset.chip;
      if (active.has(t)) active.delete(t);
      else active.add(t);
      // Empty selection means "all off" — but for usability, treat zero active as "all on" reset.
      if (active.size === 0) active = new Set(allTypes);
      persist();
      render();
    });
  });

  allChip.addEventListener('click', () => {
    active = new Set(allTypes);
    persist();
    render();
  });

  render();
}
