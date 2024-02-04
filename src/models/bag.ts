import {
  AbstractMesh,
  Color3,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

export class Bag {
  private mesh: AbstractMesh | null = null;

  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/bag/source/",
      "bag.obj",
      scene
    );

    const mesh = result.meshes[0];

    const bagMaterial = new StandardMaterial("", scene);
    bagMaterial.diffuseColor = Color3.FromHexString("#6B6055");
    mesh.material = bagMaterial;

    mesh.scaling.y = 0.25;
    mesh.scaling.x = 0.25;
    mesh.scaling.z = 0.25;

    mesh.position.z = 8;

    mesh.rotate(new Vector3(1, 0, 0), -Math.PI / 2);

    this.mesh = mesh;
  }
}
