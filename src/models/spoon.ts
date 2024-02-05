import {
  Color3,
  PBRMetallicRoughnessMaterial,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import { CoffeeBeans } from "./coffee-beans";

export class Spoon {
  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/spoon/",
      "spoon.obj",
      scene
    );

    result.meshes.forEach((mesh) => {
      mesh.position.z = 1.5;
      mesh.scaling.x = 0.8;
      mesh.scaling.y = 0.8;
      mesh.scaling.z = 0.8;
    });

    const spoon = result.meshes[1];

    spoon.rotate(new Vector3(0, 1, 0), Math.PI / 2);

    const pbr = new PBRMetallicRoughnessMaterial("", scene);
    pbr.baseColor = new Color3(0.55, 0.55, 0.55);
    pbr.metallic = 2;
    pbr.roughness = 0.6;
    spoon.material = pbr;

    const beans = new CoffeeBeans(0.15);
    const beansNode = beans.render(scene, {
      name: "coffee_beans",
      position: new Vector3(0, 0.07, -0.6),
      diameter: 0.38,
    });
    beansNode.parent = spoon;
  }
}
