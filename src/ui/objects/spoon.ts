import {
  AbstractMesh,
  Color3,
  MeshBuilder,
  PBRMetallicRoughnessMaterial,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { CoffeeBeans } from "./coffee-beans";
import { objectIdentifiers } from "../../common/object-identifiers";

export class Spoon {
  static HEIGHT = 0.5;

  private beans: CoffeeBeans | null = null;

  private handle: AbstractMesh | null = null;

  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/spoon/",
      "spoon.obj",
      scene
    );

    const handle = MeshBuilder.CreateCylinder("spoon_handle", {
      diameter: 1.5,
      height: Spoon.HEIGHT,
    });
    this.handle = handle;

    const handleMaterial = new StandardMaterial("spoon_handle_material", scene);
    handleMaterial.alpha = 0;
    handle.material = handleMaterial;

    result.meshes.forEach((mesh) => {
      handle.addChild(mesh);
    });

    const beans = new CoffeeBeans(0.15);
    this.beans = beans;
    const beansNode = beans.render(scene, {
      name: "coffee_beans",
      diameter: 0.38,
    });
    beans.setEnabled(false);
    beansNode.parent = handle;

    const spoon = result.meshes[1];
    const pbr = new PBRMetallicRoughnessMaterial("", scene);
    pbr.baseColor = new Color3(0.55, 0.55, 0.55);
    pbr.metallic = 2;
    pbr.roughness = 0.6;
    spoon.material = pbr;

    result.meshes.forEach((mesh) => {
      mesh.position.y = Spoon.HEIGHT / -2;
    });
    beans.setPosition(new Vector3(0, Spoon.HEIGHT / -2 + 0.05, -0.55));

    handle.position = new Vector3(0, Spoon.HEIGHT / 2, 2.5);
    handle.rotate(new Vector3(0, 1, 0), Math.PI / 2.5);
    handle.scaling = new Vector3(0.8, 0.8, 0.8);

    handle.id = objectIdentifiers.emptySpoon;
  }

  fill(percent: number) {
    if (percent === 0) {
      this.beans?.setEnabled(false);
      this.getHandle().id = objectIdentifiers.emptySpoon;
    } else {
      this.beans?.setEnabled(true);
      this.getHandle().id = objectIdentifiers.fullSpoon;
    }
  }

  private getHandle() {
    if (!this.handle) {
      throw new Error("Spoon not created");
    }

    return this.handle;
  }
}
