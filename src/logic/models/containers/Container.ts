import { Sample } from "../Sample";
import { Substance } from "../Substance";

export abstract class Container {
  private maxCapacity: number;

  protected substance: Substance = new Substance();

  constructor(maxCapacity: number) {
    this.maxCapacity = maxCapacity;
  }

  addSample(sample: Sample): void {
    // TODO: Validate that the max capacity is not exceeded
    this.substance.addSample(sample);
  }

  removeSample(sample: Sample): void {
    this.substance.removeSample(sample);
  }

  getFill(): number {
    return this.substance.totalAmount() / this.maxCapacity;
  }
}
