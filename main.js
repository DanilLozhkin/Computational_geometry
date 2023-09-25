const canvas = document.getElementById("renderCanvas"); // Получаем элемент холста
const engine = new BABYLON.Engine(canvas, true); // Создание движка BABYLON 3D

const createScene = function () {

    //сцена присваемая scene
    const scene = new BABYLON.Scene(engine);

    //создание камеры с присваиванием к camera с позицией
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    /*
        BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon").then((result) => {
            const house1 = scene.getMeshByName("detached_house");
            house1.position.y = 2;
            const house2 = result.meshes[2];
            house2.position.y = 1;
        });*/

    // Загрузите звук и воспроизведите его автоматически, как только он будет готов.
    const sound  = new BABYLON.Sound("cello", "ресурсы/nautilus_pompilius____butusov_vyacheslav - skovannyie_odnoy_tsepyu.mp3", scene, null, { loop: true, autoplay: true });
    sound.play();
    
    //куб с дефолтным значением и без присваивания
    //BABYLON.MeshBuilder.CreateBox("box", {})
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    //установка позиции для куба
    box.position.y = 0.5;

    //земля присвоинная ground с размерами 10 10
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 });



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