const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

let scene;

const createScene = async function () {
  const newScene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
  
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

  const result = await BABYLON.SceneLoader.ImportMeshAsync("", "resurs/", "untitled.glb", newScene);

  result.material = groundMat;
  result.meshes[0].scaling = new BABYLON.Vector3(x.value, y.value, z.value);
  //result.scaling = new BABYLON.Vector3(2, 1.5, 3);

  scene = newScene; // Присваиваем созданную сцену переменной scene
};



window.addEventListener("resize", function () {
  engine.resize();
});

const form = document.getElementById("form");
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  createScene().then(() => {
    engine.runRenderLoop(function () {
      scene.render();
    });
  });
});