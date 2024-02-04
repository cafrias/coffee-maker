import {
  AbstractMesh,
  Color3,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

export class Mug {
  private mesh: AbstractMesh | null = null;

  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/mug/",
      "mug.obj",
      scene
    );

    const mug = result.meshes[0];
    mug.scaling.y = 0.5;
    mug.scaling.x = 0.5;
    mug.scaling.z = 0.5;

    mug.position = new Vector3(0, -0.055, 0);

    mug.rotate(new Vector3(0, 1, 0), Math.PI / 4);

    const mugMaterial = new StandardMaterial("mugMaterial", scene);
    mugMaterial.diffuseColor = Color3.Red();

    mug.material = mugMaterial;

    this.mesh = mug;
  }
}
