import {
  Scene,
  SceneLoader,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import { objectIdentifiers } from "../../common/object-identifiers";

export class Bag {
  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/bag/source/",
      "bag.obj",
      scene
    );

    const mesh = result.meshes[0];
    mesh.id = objectIdentifiers.coffeeBag;

    const bagMaterial = new StandardMaterial("", scene);
    bagMaterial.diffuseTexture = new Texture(
      "/models/bag/textures/kava_low_diffuse.png"
    );
    bagMaterial.bumpTexture = new Texture(
      "/models/bag/textures/kava_low_normal.png"
    );
    bagMaterial.emissiveTexture = new Texture(
      "/models/bag/textures/kava_low_ao.png"
    );
    bagMaterial.specularTexture = new Texture(
      "/models/bag/textures/kava_low_specular.png"
    );

    mesh.material = bagMaterial;

    mesh.scaling.y = -0.1;
    mesh.scaling.x = -0.1;
    mesh.scaling.z = -0.1;

    mesh.position.z = 5;

    mesh.rotate(new Vector3(1, 0, 0), Math.PI / 2);
    mesh.rotate(new Vector3(0, 0, 1), Math.PI);
  }
}
