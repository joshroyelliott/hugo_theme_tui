var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ns-hugo-imp:/home/josh/Development/hugo_theme/assets/js/list-preview.js
var list_preview_exports = {};
__export(list_preview_exports, {
  initListPreview: () => initListPreview
});
function initListPreview() {
  const listPanel = document.querySelector(".panel--list");
  const previewPanel = document.querySelector(".panel--preview");
  if (!listPanel || !previewPanel) return;
  const previewContent = previewPanel.querySelector(".js-preview-content");
  const previewTitle = previewPanel.querySelector(".panel__title");
  const links = Array.from(listPanel.querySelectorAll(".js-preview-link"));
  if (!links.length || !previewContent) return;
  const indexURL = resolveIndexURL(window.location.pathname);
  let pagesByURL = null;
  let fetchPromise = null;
  const ensureIndex = () => {
    if (pagesByURL) return Promise.resolve(pagesByURL);
    if (fetchPromise) return fetchPromise;
    fetchPromise = fetch(indexURL, { headers: { Accept: "application/json" } }).then((r) => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))).then((pages) => {
      pagesByURL = new Map(pages.map((p) => [normalize(p.url), p]));
      return pagesByURL;
    }).catch((err) => {
      console.warn("[tui] list-preview index fetch failed:", err);
      fetchPromise = null;
      return null;
    });
    return fetchPromise;
  };
  const render = (page) => {
    if (!page) return;
    if (previewTitle) previewTitle.textContent = page.title;
    previewContent.innerHTML = page.content || "<p>(no content)</p>";
    previewPanel.dataset.currentUrl = page.url;
  };
  const selectLink = (link) => {
    links.forEach((l) => l.classList.remove("panel__list-link--active"));
    link.classList.add("panel__list-link--active");
    const idx = links.indexOf(link) + 1;
    listPanel.setAttribute("data-count", `${idx} of ${links.length}`);
  };
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
      e.preventDefault();
      const href = normalize(link.getAttribute("href"));
      selectLink(link);
      ensureIndex().then((map) => {
        if (!map) {
          window.location.href = link.href;
          return;
        }
        const page = map.get(href);
        if (page) {
          render(page);
          if (window.history && window.history.replaceState) {
            window.history.replaceState({}, "", link.href);
          }
        } else {
          window.location.href = link.href;
        }
      });
    });
  });
  previewPanel.addEventListener("click", (e) => {
    if (e.target.closest("a, button, input, textarea")) return;
    const url = previewPanel.dataset.currentUrl;
    if (url) window.location.href = url;
  });
  if (links[0]) {
    queueMicrotask(() => links[0].click());
  }
}
function normalize(url) {
  if (!url) return "";
  try {
    const u = new URL(url, window.location.origin);
    let p = u.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  } catch {
    return url.replace(/\/$/, "");
  }
}
function resolveIndexURL(pathname) {
  let base = pathname;
  if (!base.endsWith("/")) base += "/";
  return base + "index.json";
}
var init_list_preview = __esm({
  "ns-hugo-imp:/home/josh/Development/hugo_theme/assets/js/list-preview.js"() {
  }
});

// ns-hugo-imp:/home/josh/Development/hugo_theme/assets/js/model-viewer.js
var model_viewer_exports = {};
__export(model_viewer_exports, {
  initModelViewers: () => initModelViewers
});
function loadThree() {
  if (!threePromise) {
    threePromise = Promise.all([
      import("three"),
      import("three/addons/loaders/GLTFLoader.js"),
      import("three/addons/controls/OrbitControls.js")
    ]).then(([three, loaders, controls]) => ({
      THREE: three,
      GLTFLoader: loaders.GLTFLoader,
      OrbitControls: controls.OrbitControls
    }));
  }
  return threePromise;
}
async function initModelViewers() {
  const viewers = document.querySelectorAll(".tui-model-viewer");
  if (!viewers.length) return;
  const three = await loadThree();
  viewers.forEach((el) => setupViewer(el, three));
}
function readColour(name, fallback) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw || fallback;
}
function setupViewer(el, { THREE, GLTFLoader, OrbitControls }) {
  const src = el.getAttribute("data-src");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(readColour("--base00", "#1f1f28"));
  const camera = new THREE.PerspectiveCamera(
    45,
    el.clientWidth / Math.max(el.clientHeight, 1),
    0.1,
    1e3
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(el.clientWidth, el.clientHeight);
  el.appendChild(renderer.domElement);
  const ambient = new THREE.AmbientLight(
    new THREE.Color(readColour("--base05", "#dcd7ba")),
    0.6
  );
  scene.add(ambient);
  const key = new THREE.DirectionalLight(
    new THREE.Color(readColour("--base0D", "#7e9cd8")),
    0.8
  );
  key.position.set(3, 4, 2);
  scene.add(key);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  let demo = null;
  if (src) {
    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        scene.add(gltf.scene);
        frameObject(THREE, camera, controls, gltf.scene);
      },
      void 0,
      (err) => {
        console.warn("[model-viewer] failed to load", src, err);
      }
    );
  } else {
    demo = buildDemoScene(THREE);
    scene.add(demo.group);
    frameObject(THREE, camera, controls, demo.group);
  }
  function resize() {
    const w = el.clientWidth;
    const h = el.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  }
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(el);
  else window.addEventListener("resize", resize);
  new MutationObserver(() => {
    scene.background = new THREE.Color(readColour("--base00", "#1f1f28"));
    ambient.color = new THREE.Color(readColour("--base05", "#dcd7ba"));
    key.color = new THREE.Color(readColour("--base0D", "#7e9cd8"));
    if (demo) demo.retint();
  }).observe(document.documentElement, { attributes: true });
  (function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (demo) demo.tick();
    renderer.render(scene, camera);
  })();
}
function buildDemoScene(THREE) {
  const group = new THREE.Group();
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.7, 0.22, 160, 24),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(readColour("--base0B", "#76946a")),
      roughness: 0.35,
      metalness: 0.15
    })
  );
  group.add(knot);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.4, 0.02, 16, 96),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(readColour("--base0E", "#957fb8"))
    })
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);
  return {
    group,
    tick() {
      knot.rotation.y += 5e-3;
      knot.rotation.x += 2e-3;
      ring.rotation.z += 3e-3;
    },
    retint() {
      knot.material.color = new THREE.Color(readColour("--base0B", "#76946a"));
      ring.material.color = new THREE.Color(readColour("--base0E", "#957fb8"));
    }
  };
}
function frameObject(THREE, camera, controls, object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const fov = camera.fov * Math.PI / 180;
  const distance = maxDim / (2 * Math.tan(fov / 2)) * 1.6;
  camera.position.set(
    center.x + distance,
    center.y + distance * 0.7,
    center.z + distance
  );
  camera.lookAt(center);
  controls.target.copy(center);
  controls.update();
}
var threePromise;
var init_model_viewer = __esm({
  "ns-hugo-imp:/home/josh/Development/hugo_theme/assets/js/model-viewer.js"() {
    threePromise = null;
  }
});

// ns-hugo-imp:/home/josh/Development/hugo_theme/assets/js/scroll-indicator.js
function initScrollIndicators() {
  document.querySelectorAll(".js-scroll-indicator").forEach(attach);
}
function attach(indicator) {
  const panel = indicator.closest(".panel");
  if (!panel) return;
  const scroller = panel.querySelector(".panel__content") || panel;
  const update = () => position(scroller, indicator);
  update();
  scroller.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  if ("ResizeObserver" in window) {
    new ResizeObserver(update).observe(scroller);
  }
  new MutationObserver(update).observe(scroller, {
    childList: true,
    subtree: true,
    characterData: true
  });
}
function position(scroller, indicator) {
  const total = scroller.scrollHeight;
  const visible = scroller.clientHeight;
  if (total <= visible + 1) {
    indicator.style.display = "none";
    return;
  }
  indicator.style.display = "block";
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

// ns-hugo-imp:/home/josh/Development/hugo_theme/assets/js/tabs.js
var COLUMN_MIN_WIDTH = 280;
function initTabs() {
  document.querySelectorAll(".panel--tab").forEach(setupPanel);
}
function setupPanel(panel) {
  const tabs = Array.from(panel.querySelectorAll(".panel__tab"));
  if (!tabs.length) return;
  tabs.forEach((tab, i) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("tabindex", i === 0 ? "0" : "-1");
    tab.addEventListener("click", () => activate(panel, tab, tabs));
    tab.addEventListener("keydown", (e) => handleKey(e, panel, tabs));
  });
  if (panel.classList.contains("js-check-width")) {
    setupWidthCheck(panel, tabs.length);
  }
}
function activate(panel, tab, tabs) {
  if (panel.classList.contains("panel--wide-enough")) return;
  const id = tab.getAttribute("data-tab-id");
  if (!id) return;
  tabs.forEach((t) => {
    const active = t === tab;
    t.classList.toggle("panel__tab--active", active);
    t.setAttribute("tabindex", active ? "0" : "-1");
    t.setAttribute("aria-selected", active ? "true" : "false");
  });
  panel.querySelectorAll(".panel__tab-content").forEach((c) => {
    c.classList.toggle("panel__tab-content--active", c.id === id);
  });
}
function handleKey(e, panel, tabs) {
  const current = tabs.findIndex((t) => t.classList.contains("panel__tab--active"));
  if (current < 0) return;
  let next = current;
  switch (e.key) {
    case "ArrowLeft":
    case "ArrowUp":
      next = (current - 1 + tabs.length) % tabs.length;
      break;
    case "ArrowRight":
    case "ArrowDown":
      next = (current + 1) % tabs.length;
      break;
    case "Home":
      next = 0;
      break;
    case "End":
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
    panel.classList.toggle("panel--wide-enough", wide);
  };
  check();
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(check);
    ro.observe(panel);
  } else {
    window.addEventListener("resize", check);
  }
}

// ns-hugo-imp:/home/josh/Development/hugo_theme/assets/js/input-panel.js
function initInputPanels() {
  document.querySelectorAll(".panel--input").forEach(setupPanel2);
}
function setupPanel2(panel) {
  const inputs = panel.querySelectorAll("input, textarea");
  if (!inputs.length) return;
  panel.addEventListener("click", (e) => {
    if (e.target.matches("input, textarea")) return;
    const first = panel.querySelector("input, textarea");
    if (!first) return;
    first.focus();
    if (first.tagName === "INPUT") {
      first.selectionStart = first.selectionEnd = first.value.length;
    }
  });
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      document.querySelectorAll(".panel--input.is-active").forEach((p) => p.classList.remove("is-active"));
      panel.classList.add("is-active");
    });
    input.addEventListener("blur", () => {
      if (!panel.contains(document.activeElement)) {
        panel.classList.remove("is-active");
      }
    });
    if (input.tagName === "TEXTAREA") {
      const resize = () => autosize(input);
      input.addEventListener("input", resize);
      resize();
    }
  });
}
function autosize(el) {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

// <stdin>
initScrollIndicators();
initTabs();
initInputPanels();
if (document.querySelector(".panel--list") && document.querySelector(".panel--preview")) {
  Promise.resolve().then(() => (init_list_preview(), list_preview_exports)).then((m) => m.initListPreview()).catch((err) => console.error("[tui] list-preview init failed:", err));
}
if (document.querySelector(".tui-model-viewer")) {
  Promise.resolve().then(() => (init_model_viewer(), model_viewer_exports)).then((m) => m.initModelViewers()).catch((err) => console.error("[tui] model-viewer init failed:", err));
}
