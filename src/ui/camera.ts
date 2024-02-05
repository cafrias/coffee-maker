import { ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";

export class Camera {
  private canvas: HTMLCanvasElement;
  private camera: ArcRotateCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.camera = new ArcRotateCamera(
      "Camera",
      0,
      Math.PI / 3,
      24,
      Vector3.Zero()
    );
  }

  render(scene: Scene) {
    this.camera._scene = scene;
    this.attach();
  }

  attach() {
    this.camera.attachControl(this.canvas, true);
  }

  detach() {
    this.camera.detachControl();
  }
}
