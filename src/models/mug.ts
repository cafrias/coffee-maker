import {
  Color3,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { Coffee } from "./coffee";

export class Mug {
  // private mesh: AbstractMesh | null = null;

  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/mug/",
      "mug.obj",
      scene
    );

    const mug = result.meshes[0];

    mug.scaling = new Vector3(0.5, 0.5, 0.5);
    mug.position = new Vector3(0, -0.055, -4);
    mug.position = new Vector3(0, -0.055, -4);

    mug.rotate(new Vector3(0, 1, 0), Math.PI / 4);

    const mugMaterial = new StandardMaterial("mugMaterial", scene);
    mugMaterial.diffuseColor = Color3.FromHexString("#FF5E11");
    mugMaterial.specularColor = Color3.FromHexString("#d99271");

    mug.material = mugMaterial;

    const coffee = new Coffee(1.3);
    coffee.render(scene, {
      name: "mug_coffee",
      position: new Vector3(0, 0.2, 0),
      diameter: 1.8,
    });

    coffee.getNode().parent = mug;
  }
}
