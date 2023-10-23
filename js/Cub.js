
const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const result = BABYLON.SceneLoader.ImportMeshAsync("", "", "untitled.glb", scene);

  return scene;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const scene = createScene();


engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
});