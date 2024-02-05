import { Engine } from "@babylonjs/core";
import { Ground } from "./ground";
import { Camera } from "./camera";
import { Scene } from "./scene";
import { initObjects } from "./objects";

export async function initUI(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas as HTMLCanvasElement, true);
  const scene = new Scene(engine);

  const camera = new Camera(canvas);
  camera.render(scene);

  await initObjects(scene);

  const ground = new Ground();
  ground.render(scene);

  window.addEventListener("resize", () => {
    engine.resize();
  });

  engine.runRenderLoop(() => {
    scene.render();
  });

  return {
    engine,
    scene,
  };
}
