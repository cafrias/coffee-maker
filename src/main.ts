import "./main.css";
import { Engine, Scene } from "@babylonjs/core";

import "@babylonjs/loaders/OBJ";
import { Mug } from "./models/mug";
import { Spoon } from "./models/spoon";
import { Ground } from "./models/ground";
import { Camera } from "./models/camera";

async function main() {
  const canvas = document.getElementById("appCanvas");
  if (!canvas) {
    throw new Error("Canvas not found");
  }

  const engine = new Engine(canvas as HTMLCanvasElement, true);
  const scene = new Scene(engine);

  scene.createDefaultLight();

  const camera = new Camera(canvas as HTMLCanvasElement);
  camera.render(scene);

  const spoon = new Spoon();
  await spoon.render(scene);

  const mug = new Mug();
  await mug.render(scene);

  // Add and manipulate meshes in the scene
  const ground = new Ground();
  ground.render(scene);

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
