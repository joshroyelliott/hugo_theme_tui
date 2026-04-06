// model-viewer.js — lazy-loaded three.js 3D viewer.
//
// Only imported by main.js when a `.tui-model-viewer` element is in the DOM.
// Three.js is resolved through the ESM import map declared in
// partials/body/scripts-end.html, so the browser fetches it from jsdelivr on
// demand. Scene and light colours are read from the base16 CSS custom
// properties, so swapping the site colorscheme immediately re-themes any
// viewer on the page.

let threePromise = null;

function loadThree() {
  if (!threePromise) {
    threePromise = Promise.all([
      import('three'),
      import('three/addons/loaders/GLTFLoader.js'),
      import('three/addons/controls/OrbitControls.js'),
    ]).then(([three, loaders, controls]) => ({
      THREE: three,
      GLTFLoader: loaders.GLTFLoader,
      OrbitControls: controls.OrbitControls,
    }));
  }
  return threePromise;
}

export async function initModelViewers() {
  const viewers = document.querySelectorAll('.tui-model-viewer');
  if (!viewers.length) return;
  const three = await loadThree();
  viewers.forEach((el) => setupViewer(el, three));
}

function readColour(name, fallback) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return raw || fallback;
}

function setupViewer(el, { THREE, GLTFLoader, OrbitControls }) {
  const src = el.getAttribute('data-src');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(readColour('--base00', '#1f1f28'));

  const camera = new THREE.PerspectiveCamera(
    45,
    el.clientWidth / Math.max(el.clientHeight, 1),
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(el.clientWidth, el.clientHeight);
  el.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(
    new THREE.Color(readColour('--base05', '#dcd7ba')),
    0.6,
  );
  scene.add(ambient);

  const key = new THREE.DirectionalLight(
    new THREE.Color(readColour('--base0D', '#7e9cd8')),
    0.8,
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
      undefined,
      (err) => {
        console.warn('[model-viewer] failed to load', src, err);
      },
    );
  } else {
    // No data-src: render a procedural demo scene that shows off the palette.
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
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(el);
  else window.addEventListener('resize', resize);

  // Re-theme on palette changes.
  new MutationObserver(() => {
    scene.background = new THREE.Color(readColour('--base00', '#1f1f28'));
    ambient.color = new THREE.Color(readColour('--base05', '#dcd7ba'));
    key.color = new THREE.Color(readColour('--base0D', '#7e9cd8'));
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
      color: new THREE.Color(readColour('--base0B', '#76946a')),
      roughness: 0.35,
      metalness: 0.15,
    }),
  );
  group.add(knot);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.4, 0.02, 16, 96),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(readColour('--base0E', '#957fb8')),
    }),
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  return {
    group,
    tick() {
      knot.rotation.y += 0.005;
      knot.rotation.x += 0.002;
      ring.rotation.z += 0.003;
    },
    retint() {
      knot.material.color = new THREE.Color(readColour('--base0B', '#76946a'));
      ring.material.color = new THREE.Color(readColour('--base0E', '#957fb8'));
    },
  };
}

function frameObject(THREE, camera, controls, object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const fov = (camera.fov * Math.PI) / 180;
  const distance = maxDim / (2 * Math.tan(fov / 2)) * 1.6;
  camera.position.set(
    center.x + distance,
    center.y + distance * 0.7,
    center.z + distance,
  );
  camera.lookAt(center);
  controls.target.copy(center);
  controls.update();
}
