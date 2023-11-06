const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);
let scene;

function computeIntegral(t) {
    const e = Math.E;
    
    func = t => e ** (t ** 2 / 2);
    const h = (t - 0) / 10000; // Ширина каждого интервала
    let integral = 0;

    for (let i = 0; i < 10000; i++) {
        const x1 = 0 + i * h; // Левая граница интервала
        const x2 = 0 + (i + 1) * h; // Правая граница интервала
        const y = func((x1 + x2) / 2); // Среднее значение функции на интервале
        integral += y * h; // Площадь прямоугольника
    }

    return integral;
}

const Main = function (es, ei, x, σ) {
    // Здесь вы можете использовать параметры es, ei, x и σ для вычисления нового графика
    // Например, вы можете пересоздать график функции с использованием новых параметров
    const pi = Math.PI;
    var points = [];
    // for (var x = -5; x <= 5; x += 0.1) {
    //     var y = es * Math.exp((x - x) / σ) + ei;
    //     points.push(new BABYLON.Vector3(x, y, 0));
    // }

    var t2 = (es - x) / σ;
    var t1 = (ei - x) / σ;
    var integ = (1 / Math.sqrt(2 * pi)) * computeIntegral(t2);
    console.log(integ);
    console.log(es, ei, x, σ);
    var graph = BABYLON.Mesh.CreateLines("graph", points, scene);
};

const createScene = function () {
    // Создание сцены
    const newScene = new BABYLON.Scene(engine);
    scene = newScene; // Присваиваем созданную сцену переменной scene

    // Создание камеры
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);

    camera.attachControl(canvas, true);
    // Создание осей координат
    var axisX = BABYLON.Mesh.CreateLines("axisX", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(5, 0, 0)], scene);
    var axisY = BABYLON.Mesh.CreateLines("axisY", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 5, 0)], scene);

    axisX.color = new BABYLON.Color3(1, 0, 0);
    axisY.color = new BABYLON.Color3(0, 1, 0);

    const form = document.getElementById("form");
    var es = parseFloat(form.elements.es.value);
    var ei = parseFloat(form.elements.ei.value);
    var x = parseFloat(form.elements.x.value);
    var σ = parseFloat(form.elements.σ.value);

    Main(es, ei, x, σ);

    // Создание графика функции y = x^2
    var points = [];
    for (var x = -5; x <= 5; x += 0.1) {
        var y = x * x;
        points.push(new BABYLON.Vector3(x, y, 0));
    }
    var graph = BABYLON.Mesh.CreateLines("graph", points, scene);
};

window.addEventListener("resize", function () {
    engine.resize();
});

createScene(); // Вызываем функцию createScene для создания сцены

// Регистрируем цикл рендеринга для многократного рендеринга сцены
engine.runRenderLoop(function () {
    scene.render();
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Получите значения из формы и передайте их в функцию Main для обновления графика

});