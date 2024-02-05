import {
  Color3,
  MeshBuilder,
  PBRMaterial,
  PBRMetallicRoughnessMaterial,
  Scene,
  SceneLoader,
  StandardMaterial,
  TransformNode,
  Vector3,
} from "@babylonjs/core";

export class CoffeeMaker {
  private maxCoffeeHeight = 0.6;

  private coffee: TransformNode | null = null;

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
    bottle.position.y = 0;

    const glass = new PBRMaterial("", scene);
    glass.indexOfRefraction = 1.52;
    glass.alpha = 0.2;
    glass.directIntensity = 1;
    glass.environmentIntensity = 0.1;
    glass.microSurface = 1;
    glass.albedoColor = Color3.FromInts(200, 200, 200);

    bottle.material = glass;

    const bottleBand = result.meshes[6];
    bottleBand.material = bodyMaterial;

    const bottleHandle = result.meshes[7];
    bottleHandle.material = bodyMaterial;

    this.createCoffee(scene);
  }

  private createCoffee(scene: Scene) {
    const material = new StandardMaterial("", scene);
    material.diffuseColor = Color3.FromInts(36, 22, 10);
    material.specularColor = Color3.FromInts(71, 46, 24);

    const coffeeCoT = new TransformNode("coffee_transform");
    coffeeCoT.position = new Vector3(0, 0, 0);

    const coffee = MeshBuilder.CreateCylinder("coffee", {
      diameter: 1,
      height: 1,
    });
    coffee.position = new Vector3(0, 0.5, 0);
    coffee.parent = coffeeCoT;
    coffee.material = material;

    coffeeCoT.position = new Vector3(-0.25, 0.825, 0);
    coffeeCoT.scaling = new Vector3(1.75, 0.6, 1.75);

    this.coffee = coffeeCoT;
  }

  /**
   * @param height The height in percentage of the coffee in the coffee maker, 0 to 1.
   */
  public setCoffeeHeight(height: number) {
    if (!this.coffee) {
      throw new Error("Coffee not created");
    }

    if (height === 0) {
      this.coffee.setEnabled(false);
    } else {
      this.coffee.setEnabled(true);
    }

    this.coffee.scaling.y = height * this.maxCoffeeHeight;
  }
}
