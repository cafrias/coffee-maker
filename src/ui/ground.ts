import {
  GroundMesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";

export class Ground {
  public readonly mesh: GroundMesh;

  constructor(scene: Scene) {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { height: 25, width: 12, subdivisions: 4 },
      scene
    );
    ground.id = "GROUND";

    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new Texture("/textures/albedo.png");

    ground.material = groundMaterial;

    this.mesh = ground;
  }
}
