import { objectIdentifiers } from "../../../common/object-identifiers";
import { InteractiveObject } from "../InteractiveObject";
import { Container } from "./Container";

export class CoffeeMakerBottle extends Container implements InteractiveObject {
  getIdentifier(): string {
    if (this.substance.isEmpty()) {
      return objectIdentifiers.emptyBottle;
    }

    return objectIdentifiers.fullBottle;
  }
}
