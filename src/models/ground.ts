import {
  Color3,
  GroundMesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
} from "@babylonjs/core";

export class Ground {
  private mesh: GroundMesh | null = null;

  render(scene: Scene) {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { height: 12, width: 12, subdivisions: 4 },
      scene
    );

    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = Color3.Teal();

    ground.material = groundMaterial;

    this.mesh = ground;
  }
}
