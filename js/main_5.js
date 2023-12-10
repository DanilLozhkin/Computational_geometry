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