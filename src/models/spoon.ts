import {
  Color3,
  PBRMetallicRoughnessMaterial,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";

export class Spoon {
  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/spoon/",
      "spoon.obj",
      scene
    );

    result.meshes.forEach((mesh) => {
      mesh.position.z = 2;
    });

    const spoon = result.meshes[1];

    spoon.rotate(new Vector3(0, 1, 0), Math.PI / 2);

    const pbr = new PBRMetallicRoughnessMaterial("", scene);
    pbr.baseColor = new Color3(0.55, 0.55, 0.55);
    pbr.metallic = 2;
    pbr.roughness = 0.6;
    spoon.material = pbr;
  }
}
