import { Material } from "../models/materials/Material";

export class Coffee extends Material {
  getId(): string {
    return `coffee-${this.state}`;
  }
}
