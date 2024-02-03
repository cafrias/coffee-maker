import "./main.css";
import {
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  Material,
  Mesh,
  MeshBuilder,
  PositionGizmo,
  Scene,
  SceneLoader,
  StandardMaterial,
  UtilityLayerRenderer,
  Vector3,
} from "@babylonjs/core";

import "@babylonjs/loaders/OBJ";

function main() {
  const canvas = document.getElementById("appCanvas");
  if (!canvas) {
    throw new Error("Canvas not found");
  }

  const engine = new Engine(canvas as HTMLCanvasElement, true);
  const scene = new Scene(engine);

  scene.createDefaultLight();

  const camera: ArcRotateCamera = new ArcRotateCamera(
    "Camera",
    0,
    Math.PI / 3,
    8,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  SceneLoader.ImportMesh(
    "",
    "/models/spoon/",
    "spoon.obj",
    // "/models/spoon/source/",
    // "kitchenprops2.glb",
    scene,
    function (newMeshes) {
      // let candy = newMeshes[0];
      // candy.scaling = new Vector3(30,30,30);
      // candy.parent = candyProxy;
      // let candyColor = new StandardMaterial("candyCol", currScene);
      // candyColor.diffuseColor = new Color3(0, 1, 0);
      // candy.material = candyColor;
    }
  );

  SceneLoader.ImportMesh(
    "",
    "/models/mug/",
    "mug.obj",
    // "/models/spoon/source/",
    // "kitchenprops2.glb",
    scene,
    function (newMeshes) {
      // let candy = newMeshes[0];
      // candy.scaling = new Vector3(30,30,30);
      // candy.parent = candyProxy;
      // let candyColor = new StandardMaterial("candyCol", currScene);
      // candyColor.diffuseColor = new Color3(0, 1, 0);
      // candy.material = candyColor;
    }
  );

  // const light1: HemisphericLight = new HemisphericLight(
  //   "light1",
  //   new Vector3(1, 1, 0),
  //   scene
  // );
  // const sphere: Mesh = MeshBuilder.CreateSphere(
  //   "sphere",
  //   { diameter: 1 },
  //   scene
  // );
  // sphere.position.y = 1 / 2;

  // const sphere2: Mesh = MeshBuilder.CreateSphere(
  //   "sphere",
  //   { diameter: 1 / 2 },
  //   scene
  // );

  // const myMaterial = new StandardMaterial("myMaterial", scene);
  // myMaterial.diffuseColor = Color3.Red();

  // sphere2.material = myMaterial;
  // sphere2.position.y = 1 / 4;
  // sphere2.position.z = 2;

  // Add and manipulate meshes in the scene
  const ground = MeshBuilder.CreateGround(
    "ground",
    { height: 6, width: 6, subdivisions: 4 },
    scene
  );

  // hide/show the Inspector
  window.addEventListener("keydown", (ev) => {
    // Shift+Ctrl+Alt+I
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide();
      } else {
        scene.debugLayer.show();
      }
    }
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });

  // run the main render loop
  engine.runRenderLoop(() => {
    scene.render();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});
