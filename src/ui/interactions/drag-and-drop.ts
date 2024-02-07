import { AbstractMesh, PickingInfo, Vector3 } from "@babylonjs/core";
import { Camera } from "../camera";
import { Scene } from "../scene";
import { PICKABLE_OBJECTS } from "../config";
import { interactionMap } from "../../common/interaction-map";
import { Bench } from "../../logic/models/bench";

export interface DndMovement {
  target: AbstractMesh;
  initialPoint: Vector3;
  currentPoint: Vector3;
}

export class DragAndDrop {
  private scene: Scene;

  private camera: Camera;

  private bench: Bench;

  private movement: DndMovement | null = null;

  constructor(scene: Scene, camera: Camera, bench: Bench) {
    this.scene = scene;
    this.camera = camera;
    this.movement = null;
    this.bench = bench;
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

    this.scene.highlightMeshes(interactionMap[mesh.id] || []);
  }

  pointerUp() {
    if (!this.movement) {
      return;
    }

    const dropId = this.getDropId();

    const { initialPoint, target } = this.movement;

    this.camera.attach();
    target.position.copyFrom(initialPoint);
    this.movement = null;
    this.scene.clearHighlights();

    if (!dropId) {
      return;
    }

    this.bench.onInteraction(target.id, dropId);
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

  private getDropId() {
    const pickInfo = this.scene.pick(
      this.scene.pointerX,
      this.scene.pointerY,
      (mesh) => {
        return mesh.isPickable && mesh.id !== this.movement?.target.id;
      }
    );
    if (pickInfo.hit && pickInfo.pickedMesh) {
      return pickInfo.pickedMesh.id;
    }

    return null;
  }
}
