import {
  Color3,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

export class CoffeeMaker {
  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/coffee-maker/",
      "coffee-maker.obj",
      scene
    );

    const bodyMaterial = new StandardMaterial("black");
    bodyMaterial.diffuseColor = new Color3(0.31, 0.31, 0.41);

    result.meshes.forEach((mesh) => {
      mesh.scaling.x = 0.15;
      mesh.scaling.y = 0.15;
      mesh.scaling.z = 0.15;

      mesh.rotate(new Vector3(1, 0, 0), -Math.PI / 2);
      mesh.rotate(new Vector3(0, 0, 1), Math.PI / 2);

      mesh.position.z = 0;
    });

    const filter = result.meshes[0];
    filter.material = bodyMaterial;

    const body = result.meshes[1];
    body.material = bodyMaterial;

    // const indicator = result.meshes[2];

    // const onLight = result.meshes[3];

    // const screws = result.meshes[4];

    // const bottle = result.meshes[5];

    const bottleBand = result.meshes[6];
    bottleBand.material = bodyMaterial;

    const bottleHandle = result.meshes[7];
    bottleHandle.material = bodyMaterial;
  }
}
