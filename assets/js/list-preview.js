// list-preview.js — master-detail swap. Fetches <current-path>/index.json once,
// builds a url→page map, swaps preview contents on click.
// Progressive enhancement: on no-JS, the underlying <a> tags navigate normally.
export function initListPreview() {
  const listPanel = document.querySelector('.panel--list');
  const previewPanel = document.querySelector('.panel--preview');
  if (!listPanel || !previewPanel) return;

  const previewContent = previewPanel.querySelector('.js-preview-content');
  const previewTitle = previewPanel.querySelector('.panel__title');
  const links = Array.from(listPanel.querySelectorAll('.js-preview-link'));
  if (!links.length || !previewContent) return;

  // Resolve <section>/index.json: strip anything after the section path.
  const indexURL = resolveIndexURL(window.location.pathname);

  let pagesByURL = null;
  let fetchPromise = null;
  const ensureIndex = () => {
    if (pagesByURL) return Promise.resolve(pagesByURL);
    if (fetchPromise) return fetchPromise;
    fetchPromise = fetch(indexURL, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((pages) => {
        pagesByURL = new Map(pages.map((p) => [normalize(p.url), p]));
        return pagesByURL;
      })
      .catch((err) => {
        console.warn('[tui] list-preview index fetch failed:', err);
        fetchPromise = null;
        return null;
      });
    return fetchPromise;
  };

  const previewNote = previewPanel.querySelector('.panel__note');

  const render = (page) => {
    if (!page) return;
    previewContent.innerHTML = page.content || '<p>(no content)</p>';
    previewPanel.dataset.currentUrl = page.url;

    // Upgrade title to a clickable link.
    if (previewTitle) {
      previewTitle.innerHTML = '';
      const a = document.createElement('a');
      a.href = page.url;
      a.textContent = page.title;
      previewTitle.appendChild(a);
    }

    // Add open-in-page icon to the note area.
    if (previewNote) {
      previewNote.innerHTML = '';
      const a = document.createElement('a');
      a.href = page.url;
      a.textContent = '\u2197'; // ↗
      a.title = 'Open full page';
      previewNote.appendChild(a);
    }

    activateScripts(previewContent);
    previewContent.dispatchEvent(new CustomEvent('preview:load', { bubbles: true }));
  };

  const previewLabelSlot = previewPanel.querySelector('[data-preview-type-label]');

  const updatePreviewAccent = (link) => {
    const item = link?.closest('.panel__list-item');
    const color = item
      ? getComputedStyle(item).getPropertyValue('--posttype-color').trim()
      : '';
    const label = item?.dataset.posttypeLabel || '';

    if (color) {
      previewPanel.style.setProperty('--preview-accent', color);
      previewPanel.classList.add('has-active');
    } else {
      previewPanel.style.removeProperty('--preview-accent');
      previewPanel.classList.remove('has-active');
    }

    if (previewLabelSlot) {
      previewLabelSlot.textContent = label ? ` · ${label}` : '';
    }
  };

  const selectLink = (link) => {
    links.forEach((l) => l.classList.remove('panel__list-link--active'));
    link.classList.add('panel__list-link--active');
    const idx = links.indexOf(link) + 1;
    listPanel.setAttribute('data-count', `${idx} of ${links.length}`);
    updatePreviewAccent(link);
  };

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      // Respect modifier keys / middle-click for "open in new tab".
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
      e.preventDefault();
      const href = normalize(link.getAttribute('href'));
      selectLink(link);
      ensureIndex().then((map) => {
        if (!map) {
          // Fall back to navigation on fetch failure.
          window.location.href = link.href;
          return;
        }
        const page = map.get(href);
        if (page) {
          render(page);
          // Update browser URL without reload for a bookmarkable state.
          if (window.history && window.history.replaceState) {
            window.history.replaceState({}, '', link.href);
          }
        } else {
          window.location.href = link.href;
        }
      });
    });
  });

  // Auto-select first item.
  if (links[0]) {
    // Slight defer so the click doesn't race with scroll indicator init.
    queueMicrotask(() => links[0].click());
  }
}

// Normalise so "/blog/post/" and "/blog/post" match the map key.
function normalize(url) {
  if (!url) return '';
  try {
    const u = new URL(url, window.location.origin);
    let p = u.pathname;
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p;
  } catch {
    return url.replace(/\/$/, '');
  }
}

function resolveIndexURL(pathname) {
  let base = pathname;
  if (!base.endsWith('/')) base += '/';
  return base + 'index.json';
}

// innerHTML deliberately skips script execution. Replace each <script> with a
// fresh element so the browser runs it.
function activateScripts(container) {
  container.querySelectorAll('script').forEach((old) => {
    const el = document.createElement('script');
    for (const attr of old.attributes) {
      el.setAttribute(attr.name, attr.value);
    }
    el.textContent = old.textContent;
    old.replaceWith(el);
  });
}
