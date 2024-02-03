import "./main.css";
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";

function main() {
  const canvas = document.getElementById("appCanvas");
  if (!canvas) {
    throw new Error("Canvas not found");
  }

  const engine = new Engine(canvas as HTMLCanvasElement, true);
  const scene = new Scene(engine);

  const camera: ArcRotateCamera = new ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 2,
    2,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);
  const light1: HemisphericLight = new HemisphericLight(
    "light1",
    new Vector3(1, 1, 0),
    scene
  );
  const sphere: Mesh = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 1 },
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
