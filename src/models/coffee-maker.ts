import {
  Color3,
  PBRMaterial,
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

    const bodyMaterial = new StandardMaterial("");
    bodyMaterial.diffuseColor = Color3.FromInts(67, 67, 67);
    bodyMaterial.specularColor = Color3.FromInts(96, 108, 154);

    result.meshes.forEach((mesh) => {
      mesh.scaling.x = 0.1;
      mesh.scaling.y = 0.1;
      mesh.scaling.z = 0.1;

      mesh.rotate(new Vector3(1, 0, 0), -Math.PI / 2);
      mesh.rotate(new Vector3(0, 0, 1), Math.PI / 2);

      mesh.position.z = 0;
    });

    const filter = result.meshes[0];
    filter.material = bodyMaterial;

    const body = result.meshes[1];
    body.material = bodyMaterial;

    const indictorGlass = new PBRMaterial("", scene);
    indictorGlass.indexOfRefraction = 0.12;
    indictorGlass.alpha = 0.7;
    indictorGlass.directIntensity = 0.7;
    indictorGlass.environmentIntensity = 0.4;
    indictorGlass.cameraExposure = 0.66;
    indictorGlass.cameraContrast = 1.66;
    indictorGlass.microSurface = 0.5;
    indictorGlass.reflectivityColor = new Color3(0.3, 0.3, 0.3);
    indictorGlass.albedoColor = new Color3(0.9, 0.9, 0.9);

    const indicator = result.meshes[2];
    indicator.material = indictorGlass;

    // const onLight = result.meshes[3];

    // const screws = result.meshes[4];

    const bottle = result.meshes[5];

    const glass = new PBRMaterial("", scene);
    // glass.reflectionTexture = hdrTexture;
    glass.indexOfRefraction = 0.52;
    glass.alpha = 0.4;
    // glass.directIntensity = 0.0;
    glass.directIntensity = 0.3;
    glass.environmentIntensity = 0.4;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new Color3(0.3, 0.3, 0.3);
    glass.albedoColor = new Color3(0.9, 0.9, 0.9);

    bottle.material = glass;

    const bottleBand = result.meshes[6];
    bottleBand.material = bodyMaterial;

    const bottleHandle = result.meshes[7];
    bottleHandle.material = bodyMaterial;
  }
}
