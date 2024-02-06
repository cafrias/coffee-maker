import {
  AbstractMesh,
  Color3,
  MeshBuilder,
  PBRMaterial,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { Coffee } from "./coffee";
import { objectIdentifiers } from "../../common/object-identifiers";

interface CreateBottleInput {
  flask: AbstractMesh;
  band: AbstractMesh;
  handle: AbstractMesh;
  coffee: Coffee;
  scene: Scene;
}

export class CoffeeMaker {
  static HEIGHT = 1.5;

  private coffee: Coffee | null = null;

  async render(scene: Scene) {
    const { body, bottle, filter, waterIndicator } = await this.loadModel(
      scene
    );

    body.id = objectIdentifiers.coffeeMaker;
    bottle.group.id = objectIdentifiers.emptyBottle;

    const bodyMaterial = new StandardMaterial("");
    bodyMaterial.diffuseColor = Color3.FromInts(67, 67, 67);
    bodyMaterial.specularColor = Color3.FromInts(96, 108, 154);
    filter.material = bodyMaterial;
    body.material = bodyMaterial;
    bottle.band.material = bodyMaterial;
    bottle.handle.material = bodyMaterial;

    const indictorGlass = new PBRMaterial("", scene);
    indictorGlass.indexOfRefraction = 1.52;
    indictorGlass.alpha = 0.2;
    indictorGlass.directIntensity = 0.7;
    indictorGlass.environmentIntensity = 0.2;
    indictorGlass.microSurface = 0.5;
    indictorGlass.reflectivityColor = new Color3(0.3, 0.3, 0.3);
    indictorGlass.albedoColor = new Color3(0.9, 0.9, 0.9);
    waterIndicator.material = indictorGlass;

    const glass = new PBRMaterial("", scene);
    glass.indexOfRefraction = 1.52;
    glass.alpha = 0.2;
    glass.directIntensity = 1;
    glass.environmentIntensity = 0.1;
    glass.microSurface = 1;
    glass.albedoColor = Color3.FromInts(200, 200, 200);
    bottle.flask.material = glass;
  }

  private createCoffee(scene: Scene, position: Vector3) {
    this.coffee = new Coffee(0.6);
    this.coffee.render(scene, {
      name: "coffee_in_maker",
      diameter: 1.75,
      position,
    });
    return this.coffee;
  }

  public setCoffeeHeight(height: number) {
    return this.coffee?.setHeight(height);
  }

  private async loadModel(scene: Scene) {
    const result = await SceneLoader.ImportMeshAsync(
      null,
      "/models/coffee-maker/",
      "coffee-maker.obj",
      scene
    );

    result.meshes.forEach((mesh) => {
      mesh.scaling.x = 0.1;
      mesh.scaling.y = 0.1;
      mesh.scaling.z = 0.1;

      mesh.rotate(new Vector3(1, 0, 0), -Math.PI / 2);
      mesh.rotate(new Vector3(0, 0, 1), Math.PI / 2);

      mesh.position.z = 0;
    });

    const bottleMeshPosition = new Vector3(0, -CoffeeMaker.HEIGHT, 0);
    const flask = result.meshes[5];
    flask.position = bottleMeshPosition.clone();
    const band = result.meshes[6];
    band.position = bottleMeshPosition.clone();
    const handle = result.meshes[7];
    handle.position = bottleMeshPosition.clone();

    const coffee = this.createCoffee(
      scene,
      new Vector3(-0.25, CoffeeMaker.HEIGHT / -2, 0)
    );

    const bottle = this.createBottle({
      band,
      coffee,
      flask,
      handle,
      scene,
    });

    return {
      filter: result.meshes[0],
      body: result.meshes[1],
      waterIndicator: result.meshes[2],
      onLight: result.meshes[3],
      bottle: {
        group: bottle,
        flask,
        band,
        handle,
      },
    };
  }

  private createBottle({
    band,
    coffee,
    flask,
    handle,
    scene,
  }: CreateBottleInput) {
    const group = MeshBuilder.CreateCylinder("bottle", {
      diameter: 2.75,
      height: CoffeeMaker.HEIGHT,
    });
    const invisibleMaterial = new StandardMaterial("invisible", scene);
    invisibleMaterial.alpha = 0;
    group.material = invisibleMaterial;
    group.addChild(flask);
    group.addChild(band);
    group.addChild(handle);
    coffee.setParent(group);

    group.position = new Vector3(0, CoffeeMaker.HEIGHT / 2 + 0.75, 0);

    return group;
  }
}
