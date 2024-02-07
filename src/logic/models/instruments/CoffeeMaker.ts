import { objectIdentifiers } from "../../../common/object-identifiers";
import { Coffee } from "../../materials/Coffee";
import { InteractiveObject } from "../InteractiveObject";
import { MatterState } from "../MatterState";
import { Sample } from "../Sample";
import { Tickable } from "../Tickable";
import { CoffeeMakerBottle } from "../containers/CoffeeMakerBottle";

export class CoffeeMaker implements InteractiveObject, Tickable {
  static COFFEE_CREATION_CONSTANT = 0.01;

  private bottle: CoffeeMakerBottle;

  private turnedOn: boolean = true;

  private hasCoffee: boolean = false;

  constructor(bottle: CoffeeMakerBottle) {
    this.bottle = bottle;
  }

  getIdentifier() {
    return objectIdentifiers.coffeeMaker;
  }

  turnOn() {
    this.turnedOn = true;
  }

  turnOff() {
    this.turnedOn = false;
  }

  setHasCoffee(hasCoffee: boolean) {
    this.hasCoffee = hasCoffee;
  }

  tick() {
    if (!this.turnedOn || !this.hasCoffee) {
      return;
    }

    if (this.bottle.isFull()) {
      this.setHasCoffee(false);
      return;
    }

    console.log("Adding", CoffeeMaker.COFFEE_CREATION_CONSTANT);
    this.bottle.addSample(
      new Sample(
        CoffeeMaker.COFFEE_CREATION_CONSTANT,
        new Coffee(MatterState.LIQUID)
      )
    );
  }
}
