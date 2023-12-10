const canvas = document.getElementById("canvas"); // Получаем элемент холста
const engine = new BABYLON.Engine(canvas, true); // Создание движка BABYLON 3D

const createScene = function () {
    //сцена присваиваемая scene
    const scene = new BABYLON.Scene(engine);

    //создание камеры с присваиванием к camera с позицией
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    window.addEventListener('resize', () => {
        engine.resize();
    });

    const polygon_1=[
        new BABYLON.Vector3(-2, 0, 2), 
        new BABYLON.Vector3(2, 0, 2), 
        new BABYLON.Vector3(0, 0, -6),
        new BABYLON.Vector3(4, 3, -6),
    ]
    const polygon = [];

    // Создаем полигон с тремя вершинами
    for (var i = 0; i <= polygon_1.length - 3; i++) {
        polygon.push(BABYLON.MeshBuilder.CreatePolygon("polygon", { shape: [polygon_1[i], polygon_1[i + 1], polygon_1[i + 2]], sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true }, scene));
    }

    // Устанавливаем цвет полигона
    const polygonMaterial = new BABYLON.StandardMaterial("polygonMaterial", scene);
    polygonMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0); // Красный цвет

    for (var i = 0; i < polygon.length; i++) {
        polygon[i].material = polygonMaterial;
    }

    return scene;
};

const scene = createScene(); // Вызов функции createScene

// Регистрируем цикл рендеринга для многократного рендеринга сцены
engine.runRenderLoop(function () {
    scene.render();
});

//  Следим за событиями изменения размера браузера / холста
window.addEventListener("resize", function () {
    engine.resize();
});