import { Container } from "./Container";

export class Mug extends Container {
  static MAX_CAPACITY = 1;

  constructor() {
    super(Mug.MAX_CAPACITY);
  }
}
