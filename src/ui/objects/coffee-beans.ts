import {
  TransformNode,
  Scene,
  Vector3,
  StandardMaterial,
  Color3,
  MeshBuilder,
  Texture,
} from "@babylonjs/core";
import { CoffeeOptions } from "./coffee";

export class CoffeeBeans {
  private node: TransformNode | null = null;

  private maxHeight: number;

  constructor(maxHeight: number) {
    this.maxHeight = maxHeight;
  }

  render(
    scene: Scene,
    { name, position = new Vector3(0, 0, 0), diameter = 1 }: CoffeeOptions
  ) {
    const material = new StandardMaterial("", scene);
    material.diffuseColor = Color3.FromInts(36, 22, 10);
    material.specularColor = Color3.FromInts(71, 46, 24);

    const coffeeCoT = new TransformNode(`${name}_transform`);
    coffeeCoT.position = new Vector3(0, 0, 0);

    const coffee = MeshBuilder.CreateCylinder(name, {
      diameter,
      height: 1,
      diameterTop: 0.05,
    });
    coffee.position = new Vector3(0, 0.5, 0);
    coffee.parent = coffeeCoT;
    coffee.material = material;

    coffeeCoT.position = position;
    coffeeCoT.scaling = new Vector3(1.0, this.maxHeight, 1.0);

    new Texture("/textures/albedo.png");

    this.node = coffeeCoT;

    return coffeeCoT;
  }

  /**
   * @param height The height in percentage of the coffee in the coffee maker, 0 to 1.
   */
  public setHeight(height: number) {
    if (!this.node) {
      throw new Error("Coffee not created");
    }

    if (height === 0) {
      this.node.setEnabled(false);
    } else {
      this.node.setEnabled(true);
    }

    this.node.scaling.y = height * this.maxHeight;
  }

  public setPosition(position: Vector3) {
    this.node?.position.copyFrom(position);
  }
}
