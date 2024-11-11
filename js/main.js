const canvasContainer = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvasContainer,
});
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffaa00, 1, 100);
pointLight.position.set(-5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const loader = new THREE.GLTFLoader();
let currentModel;

function loadModel(modelPath) {
  if (currentModel) {
    scene.remove(currentModel);
  }

  loader.load(modelPath, (gltf) => {
    currentModel = gltf.scene;
    currentModel.scale.set(1, 1, 1);
    currentModel.position.y = 0;
    scene.add(currentModel);
  });
}

loadModel("./assets/mex/scene.gltf");

document
  .getElementById("mex")
  .addEventListener("click", () => loadModel("./assets/mex/scene.gltf"));
document
  .getElementById("edo")
  .addEventListener("click", () => loadModel("./assets/mex/scene.gltf"));
document
  .getElementById("andrey")
  .addEventListener("click", () => loadModel("./assets/mex/scene.gltf"));
document
  .getElementById("hetag")
  .addEventListener("click", () => loadModel("./assets/mex/scene.gltf"));

document
  .getElementById("hetag")
  .addEventListener("click", () => loadModel("./assets/mex/scene.gltf"));

document
  .getElementById("light-intensity")
  .addEventListener("input", (event) => {
    directionalLight.intensity = event.target.value;
  });

document.getElementById("light-color").addEventListener("input", (event) => {
  directionalLight.color.set(event.target.value);
});

function showModelInfo(name, description) {
  document.getElementById("model-name").textContent = name;
  document.getElementById("model-description").innerHTML = description;
}

document.getElementById("mex").addEventListener("click", () => {
  loadModel("./assets/mex/scene.gltf");
  showModelInfo(
    "Mex",
    "<h2>Макс - тип обычный</h2> <p>Frontend developer, PHP, JS</p> <p>Есть младший брат - Ренат</p>"
  );
});

document.getElementById("edo").addEventListener("click", () => {
  loadModel("./assets/mex/scene.gltf");
  showModelInfo(
    "Edo",
    "<h2>Эдуард - тип черный</h2> <p>Backend developer, GO, Python</p> <p>Есть девушка...</p>"
  );
});

document.getElementById("andrey").addEventListener("click", () => {
  loadModel("./assets/mex/scene.gltf");
  showModelInfo(
    "Андрей старый",
    "<h2>Андрей - тип старый</h2> <p>Backend developer, GO, RUST, Husky</p> <p>Триппер, музыкант</p> <p>Любит сосиски</p>"
  );
});

document.getElementById("hetag").addEventListener("click", () => {
  loadModel("./assets/mex/scene.gltf");
  showModelInfo(
    "Hetag",
    "<h2>Хетаг - тип интеграция</h2> <p>Backend developer, GO</p> <p>Человек интеграция - рекорд 2000 интеграций</p> <p>Любит свою шестерку и не только...</p>"
  );
});

document.getElementById("renat").addEventListener("click", () => {
  loadModel("./assets/mex/scene.gltf");
  showModelInfo(
    "Renat",
    "<h2>Ренат - тип сеньор</h2> <p>Frontend developer, JS</p> <p>Есть старший брат - Макс</p> <p>Говорит что Макс - личный менеджер</p>"
  );
});

document.getElementById("reset").addEventListener("click", () => {
  if (currentModel) {
    currentModel.rotation.set(0, 0, 0);
    currentModel.position.set(0, 1, 0);
    controls.reset();
  }
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
