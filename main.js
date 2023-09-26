const canvas = document.getElementById("renderCanvas"); // Получаем элемент холста
const engine = new BABYLON.Engine(canvas, true); // Создание движка BABYLON 3D

const createScene = function () {

    //сцена присваемая scene
    const scene = new BABYLON.Scene(engine);

    //создание камеры с присваиванием к camera с позицией
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

        /**** Materials *****/
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)

    //texture
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png")


    /* мешевые объекты 
            BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon").then((result) => {
                const house1 = scene.getMeshByName("detached_house");
                house1.position.y = 2;
                const house2 = result.meshes[2];
                house2.position.y = 1;
            });
    */

    /* Загрузите звук и воспроизведите его автоматически, как только он будет готов.
        const sound  = new BABYLON.Sound("cello", "ресурсы/nautilus_pompilius____butusov_vyacheslav - skovannyie_odnoy_tsepyu.mp3", scene, null, { loop: true, autoplay: true });
        sound.play();
    */

    /* куб до 2.1
            //куб с дефолтным значением и без присваивания
            //BABYLON.MeshBuilder.CreateBox("box", {})
    
            const box = BABYLON.MeshBuilder.CreateBox("box", {});
            //установка позиции для куба
            box.position.y = 0.5;
    
    */

    /* размещение множества объектов и их позиционирование  2.3 
        // разная реализация размеров 3 штуки
    
        //1 через параметры
        const box = BABYLON.MeshBuilder.CreateBox("box", { width: 2, height: 1.5, depth: 3 });
        box.position.y = 0.75;
    
        //2 реализация размеров может быть тоже через вектр
        const box2 = BABYLON.MeshBuilder.CreateBox("box2", {});
        box2.scaling.x = 2;
        box2.scaling.y = 1.5;
        box2.scaling.z = 3;
        box2.position = new BABYLON.Vector3(-3, 0.75, 0);
    
        //3 способ в вектр
        const box3 = BABYLON.MeshBuilder.CreateBox("box3", {});
        box3.scaling = new BABYLON.Vector3(2, 1.5, 3);
        box3.position.x = 3;
        box3.position.y = 0.75;
        box3.position.z = 0;
    
        // поворот через пропорции и градусы(не складывается)
        //box.rotation.y = Math.PI / 4;
        box.rotation.y = BABYLON.Tools.ToRadians(45);
    */
    /* создание домика*/


    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.y = 0.5;
    box.material = boxMat;
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
    roof.material = roofMat;
    roof.scaling.x = 0.75;
    roof.rotation.z = BABYLON.Tools.ToRadians(90);
    roof.position.y = 1.22;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    ground.material = groundMat;
    
    /* или можно использовать если одностипный цвет
    new BABYLON.Color3(0, 0.6, 0);
    new BABYLON.Color3.Red();
    new BABYLON.Color3.Green();
    new BABYLON.Color3.Blue();
    new BABYLON.Color3.Black();
    new BABYLON.Color3.White();
    new BABYLON.Color3.Purple();
    new BABYLON.Color3.Magenta();
    new BABYLON.Color3.Yellow();
    new BABYLON.Color3.Gray(),
    new BABYLON.Color3.Teal();
    */

    ground.material = groundMat; // Помещаем материальное свойство земли

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