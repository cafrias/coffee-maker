import { objectIdentifiers } from "../../common/object-identifiers";
import { CoffeeBag } from "./containers/CoffeeBag";
import { CoffeeMakerBottle } from "./containers/CoffeeMakerBottle";
import { Mug } from "./containers/Mug";
import { Spoon } from "./containers/Spoon";
import { CoffeeMaker } from "./instruments/CoffeeMaker";

interface BenchTickResult {
  spoonFill: number;
  bottleFill: number;
}

export class Bench {
  private coffeeBag = new CoffeeBag();
  private spoon = new Spoon();
  private bottle = new CoffeeMakerBottle(2);
  private coffeeMaker = new CoffeeMaker(this.bottle);
  private mug = new Mug(1);

  tick(): BenchTickResult {
    this.coffeeMaker.tick();

    return {
      spoonFill: this.spoon.getFill(),
      bottleFill: this.bottle.getFill(),
    };
  }

  onInteraction(from: string, to: string): void {
    if (
      from === objectIdentifiers.emptySpoon &&
      to === objectIdentifiers.coffeeBag
    ) {
      this.spoon.fillFrom(this.coffeeBag);
      return;
    }

    if (
      from === objectIdentifiers.fullSpoon &&
      to === objectIdentifiers.coffeeMaker
    ) {
      this.spoon.empty();
      this.coffeeMaker.setHasCoffee(true);
      return;
    }
  }
}
