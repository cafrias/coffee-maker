import { objectIdentifiers } from "../../../common/object-identifiers";
import { CoffeeBean } from "../../materials/CoffeeBean";
import { InteractiveObject } from "../InteractiveObject";
import { MatterState } from "../MatterState";
import { Sample } from "../Sample";
import { Container } from "./Container";

export class Spoon extends Container implements InteractiveObject {
  static MAX_CAPACITY = 1;

  constructor() {
    super(Spoon.MAX_CAPACITY);
  }

  getIdentifier(): string {
    if (this.substance.isEmpty()) {
      return objectIdentifiers.emptySpoon;
    }

    return objectIdentifiers.fullSpoon;
  }

  fillFrom(container: Container): void {
    const toFill = new Sample(
      Spoon.MAX_CAPACITY,
      new CoffeeBean(MatterState.SOLID)
    );
    container.removeSample(toFill);
    this.substance.addSample(toFill);
  }
}
