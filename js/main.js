const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
