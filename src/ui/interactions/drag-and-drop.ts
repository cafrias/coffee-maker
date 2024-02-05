import { AbstractMesh, PickingInfo, Vector3 } from "@babylonjs/core";
import { Camera } from "../camera";
import { Scene } from "../scene";
import { PICKABLE_OBJECTS } from "../config";

export interface DndMovement {
  target: AbstractMesh;
  initialPoint: Vector3;
  currentPoint: Vector3;
}

export class DragAndDrop {
  private scene: Scene;
  private camera: Camera;

  private movement: DndMovement | null = null;

  constructor(scene: Scene, camera: Camera) {
    this.scene = scene;
    this.camera = camera;
    this.movement = null;
  }

  pick(info: PickingInfo | null) {
    if (!info || !info.hit || !info.pickedMesh) {
      return;
    }

    if (PICKABLE_OBJECTS.includes(info.pickedMesh.id)) {
      this.pointerDown(info.pickedMesh);
      return;
    }
  }

  private pointerDown(mesh: AbstractMesh) {
    const groundPosition = this.getGroundPosition();
    if (!groundPosition) {
      return;
    }

    this.movement = {
      target: mesh,
      initialPoint: mesh.position.clone(),
      currentPoint: groundPosition,
    };

    this.camera.detach();
  }

  pointerUp() {
    if (!this.movement) {
      return;
    }

    const { initialPoint, target } = this.movement;

    this.camera.attach();
    target.position.copyFrom(initialPoint);
    this.movement = null;
  }

  pointerMove() {
    if (!this.movement) {
      return;
    }

    const current = this.getGroundPosition();
    if (!current) {
      return;
    }

    const diff = current.subtract(this.movement.currentPoint);
    this.movement.target.position.addInPlace(diff);

    this.movement.currentPoint = current;
  }

  private getGroundPosition() {
    const pickInfo = this.scene.pick(
      this.scene.pointerX,
      this.scene.pointerY,
      function (mesh) {
        return mesh.id === "GROUND";
      }
    );
    if (pickInfo.hit) {
      return pickInfo.pickedPoint;
    }

    return null;
  }
}
