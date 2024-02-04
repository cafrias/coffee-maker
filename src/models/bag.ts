import {
  Scene,
  SceneLoader,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";

export class Bag {
  async render(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/bag/source/",
      "bag.obj",
      scene
    );

    const mesh = result.meshes[0];

    const bagMaterial = new StandardMaterial("", scene);
    bagMaterial.diffuseTexture = new Texture(
      "/models/bag/textures/kava_low_diffuse.png"
    );
    bagMaterial.emissiveTexture = new Texture(
      "/models/bag/textures/kava_low_normal.png"
    );
    bagMaterial.ambientTexture = new Texture(
      "/models/bag/textures/kava_low_ao.png"
    );
    bagMaterial.specularTexture = new Texture(
      "/models/bag/textures/kava_low_specular.png"
    );

    mesh.material = bagMaterial;

    mesh.scaling.y = -0.25;
    mesh.scaling.x = -0.25;
    mesh.scaling.z = -0.25;

    mesh.position.z = 8;

    mesh.rotate(new Vector3(1, 0, 0), Math.PI / 2);
    mesh.rotate(new Vector3(0, 0, 1), Math.PI);
  }
}
