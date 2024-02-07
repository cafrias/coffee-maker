import { objectIdentifiers } from "../../../common/object-identifiers";
import { InteractiveObject } from "../InteractiveObject";
import { Container } from "./Container";

export class Mug extends Container implements InteractiveObject {
  getIdentifier(): string {
    return objectIdentifiers.mug;
  }
}
