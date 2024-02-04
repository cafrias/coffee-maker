import { ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";

export class Camera {
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  render(scene: Scene) {
    const camera = new ArcRotateCamera(
      "Camera",
      0,
      Math.PI / 3,
      8,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(this.canvas, true);
  }
}
