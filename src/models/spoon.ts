import { Scene, SceneLoader, Vector3 } from "@babylonjs/core";

export class Spoon {
  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/spoon/",
      "spoon.obj",
      scene
    );
    const spoon = result.meshes[0];
    spoon.position.z = 3;

    spoon.rotate(new Vector3(0, 1, 0), Math.PI / 2);
  }
}
