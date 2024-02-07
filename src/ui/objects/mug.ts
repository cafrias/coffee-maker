import {
  AbstractMesh,
  Color3,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { Coffee } from "./coffee";
import { objectIdentifiers } from "../../common/object-identifiers";

export class Mug {
  private mesh: AbstractMesh | null = null;

  private coffee: Coffee | null = null;

  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/mug/",
      "mug.obj",
      scene
    );

    const mug = result.meshes[0];
    this.mesh = mug;
    this.setId(objectIdentifiers.emptyMug);

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
    coffee.setEnabled(false);
    coffee.setParent(mug);
    this.coffee = coffee;

    mug.scaling = new Vector3(0.5, 0.5, 0.5);
    mug.position = new Vector3(0.22, -0.055, -4);
    mug.rotate(new Vector3(0, 1, 0), Math.PI / 4);
  }

  private setId(id: string) {
    const mesh = this.getMesh();
    mesh.id = id;
    mesh.name = id;
  }

  private getMesh() {
    if (!this.mesh) {
      throw new Error("Mug mesh not found");
    }

    return this.mesh;
  }

  private getCoffee() {
    if (!this.coffee) {
      throw new Error("Coffee not found");
    }

    return this.coffee;
  }

  fill(percent: number) {
    if (percent < 1) {
      this.setId(objectIdentifiers.emptyMug);
    }

    if (percent === 0) {
      this.getCoffee().setEnabled(false);
      return;
    }

    this.getCoffee().setEnabled(true);
    this.getCoffee().setHeight(percent);
    this.setId(objectIdentifiers.fullMug);
  }
}
