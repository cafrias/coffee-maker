import { MeshBuilder, Scene, StandardMaterial, Texture } from "@babylonjs/core";

export class Ground {
  render(scene: Scene) {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { height: 25, width: 12, subdivisions: 4 },
      scene
    );

    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new Texture("/textures/albedo.png");

    ground.material = groundMaterial;
  }
}
