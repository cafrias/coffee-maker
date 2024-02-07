import { objectIdentifiers } from "../../../common/object-identifiers";
import { CoffeeBean } from "../../materials/CoffeeBean";
import { MatterState } from "../MatterState";
import { Sample } from "../Sample";
import { Container } from "./Container";

export class CoffeeBag extends Container {
  static MAX_CAPACITY = Infinity;

  constructor() {
    super(CoffeeBag.MAX_CAPACITY);
    this.substance.addSample(
      new Sample(Infinity, new CoffeeBean(MatterState.SOLID))
    );
  }

  getIdentifier(): string {
    return objectIdentifiers.coffeeBag;
  }
}
