import { Color3, MeshBuilder, Scene, StandardMaterial } from "@babylonjs/core";

export class Ground {
  render(scene: Scene) {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { height: 25, width: 12, subdivisions: 4 },
      scene
    );

    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = Color3.FromHexString("#383838");

    ground.material = groundMaterial;
  }
}
