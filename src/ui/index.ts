import { Engine, PointerEventTypes } from "@babylonjs/core";
import { Ground } from "./ground";
import { Camera } from "./camera";
import { Scene } from "./scene";
import { initObjects } from "./objects";
import { DragAndDrop } from "./interactions/drag-and-drop";

export async function initUI(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas as HTMLCanvasElement, true);
  const scene = new Scene(engine);

  const camera = new Camera(canvas);
  camera.render(scene);

  await initObjects(scene);

  new Ground(scene);

  const dnd = new DragAndDrop(scene, camera);

  scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        dnd.pick(pointerInfo.pickInfo);
        break;
      case PointerEventTypes.POINTERUP:
        dnd.pointerUp();
        break;
      case PointerEventTypes.POINTERMOVE:
        dnd.pointerMove();
        break;
    }
  });

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
