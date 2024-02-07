import { Material } from "../models/materials/Material";

export class CoffeeBean extends Material {
  getId(): string {
    return `coffee-bean-${this.state}`;
  }
}
