import { Material } from "./materials/Material";

/**
 * Represents an amount of a material
 */
export class Sample {
  readonly amount: number;
  readonly material: Material;

  constructor(amount: number, material: Material) {
    this.amount = amount;
    this.material = material;
  }

  add(sample: Sample) {
    if (sample.material.getId() !== this.material.getId()) {
      throw new Error("Cannot add samples of different materials");
    }

    return new Sample(this.amount + sample.amount, this.material);
  }

  remove(sample: Sample) {
    if (sample.material.getId() !== this.material.getId()) {
      throw new Error("Cannot remove samples of different materials");
    }

    return new Sample(Math.max(0, this.amount - sample.amount), this.material);
  }

  isEmpty() {
    return this.amount === 0;
  }
}
