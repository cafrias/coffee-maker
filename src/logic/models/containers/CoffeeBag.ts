import { objectIdentifiers } from "../../../common/object-identifiers";
import { CoffeeBean } from "../../materials/CoffeeBean";
import { InteractiveObject } from "../InteractiveObject";
import { MatterState } from "../MatterState";
import { Sample } from "../Sample";
import { Container } from "./Container";

export class CoffeeBag extends Container implements InteractiveObject {
  constructor() {
    super();
    this.substance.addSample(
      new Sample(Infinity, new CoffeeBean(MatterState.SOLID))
    );
  }

  getIdentifier(): string {
    return objectIdentifiers.coffeeBag;
  }
}
