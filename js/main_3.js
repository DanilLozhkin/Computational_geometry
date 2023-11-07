const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);
let scene;
const e = Math.E;
const pi = Math.PI;

function computeIntegral(t) {
    const n = 100000;
    let sum = 0;

    const dx = (t - 0) / n;
    const f = t => e ** (-(t ** 2) / 2);

    for (let i = 0; i < n; i++) {
        const x1 = 0 + i * dx;
        const x2 = x1 + dx;
        const y = f((x1 + x2) / 2);
        sum += y * dx;
    }

    return ((1 / Math.sqrt(2 * pi)) * sum);
}

const Main = function (es, ei, x, σ) {

    var P = [];

    var t2 = (es - x) / σ;
    var t1 = (ei - x) / σ;
    P[0] = (computeIntegral(t2) - computeIntegral(t1)) * 100;
 
    var t2_2 = t1;
    var t1_2 = -3;
    P[1] = (computeIntegral(t2_2) - computeIntegral(t1_2)) * 100;

    var t2_3 = 3;
    var t1_3 = t2;
    P[2] = (computeIntegral(t2_3) - computeIntegral(t1_3)) * 100;

    return P
};

const createScene = function () {

    // Создание сцены
    const newScene = new BABYLON.Scene(engine);
    scene = newScene; // Присваиваем созданную сцену переменной scene

    // Создание камеры
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.target = new BABYLON.Vector3(0, 3, 0);

    camera.attachControl(canvas, true);

    // Создание осей координат
    var axisX = BABYLON.Mesh.CreateLines("axisX", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(10, 0, 0)], scene);
    var axisY = BABYLON.Mesh.CreateLines("axisY", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 10, 0)], scene);

    axisX.color = new BABYLON.Color3(1, 0, 0);
    axisY.color = new BABYLON.Color3(0, 1, 0);

    const form = document.getElementById("form");
    var es = parseFloat(form.elements.es.value);
    var ei = parseFloat(form.elements.ei.value);
    var xa = parseFloat(form.elements.x.value);
    var σ = parseFloat(form.elements.σ.value);
    var X_w = parseFloat(form.elements.X_w.value);
    var Y_w = parseFloat(form.elements.Y_w.value);
    let Good = document.getElementById('Good');
    let notGood = document.getElementById('notGood');
    let MaybeGood = document.getElementById('MaybeGood');

    // Создание вертикальной линии для ei
    var axisei = BABYLON.Mesh.CreateLines("axisei", [
        new BABYLON.Vector3(ei / X_w, 0, 0),
        new BABYLON.Vector3(ei / X_w, 10, 0)
    ], scene);
    axisei.color = new BABYLON.Color3(1, 1, 0);

    // Создание вертикальной линии для es
    var axises = BABYLON.Mesh.CreateLines("axises", [
        new BABYLON.Vector3(es / X_w, 0, 0),
        new BABYLON.Vector3(es / X_w, 10, 0)
    ], scene);
    axises.color = new BABYLON.Color3(1, 1, 0);

    var P = Main(es, ei, xa, σ);

    Good.innerHTML = `${P[0].toFixed(3)}% - годных деталей.`;
    notGood.innerHTML = `${P[1].toFixed(3)}% - неисправимого брака.`;
    MaybeGood.innerHTML = `${P[2].toFixed(3)}% - исправимого брака.`;

    var obl_1 = [];
    var obl_2 = [];
    var points = [];
    for (var x = -5; x <= 5; x += 0.0001) {
        var y = (1 / (σ * Math.sqrt(2 * pi))) * (e ** -(((x - xa) ** 2) / (2 * σ ** 2)));
        points.push(new BABYLON.Vector3(x / X_w, y / Y_w, 0));

        if (x > 0 && y > 0 && x < ei) {
            for(var s = 0; s < y; s +=0.01){
                obl_1.push(new BABYLON.Vector3(x / X_w, s / Y_w, 0));
            }
        }
        if (x > 0 && y > 0 && es<x) {
            for(var s = 0; s < y; s +=0.01){
                obl_2.push(new BABYLON.Vector3(x / X_w, s / Y_w, 0));
            }
        }
    }
    var graph = BABYLON.Mesh.CreateLines("graph", points, scene);
    var graph_obl_1 = BABYLON.Mesh.CreateLines("graph", obl_1, scene);
    var graph_obl_2 = BABYLON.Mesh.CreateLines("graph", obl_2, scene);

    engine.runRenderLoop(function () {
        scene.render();
    });
};

window.addEventListener("resize", function () {
    engine.resize();
});

const form = document.getElementById("form");
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Перезапускаем создание сцены при изменении параметров
    if (scene) {
        scene.dispose();
    }
    createScene();
});