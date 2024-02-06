import { Scene } from "../scene";
import { Spoon } from "./spoon";
import { Mug } from "./mug";
import { CoffeeMaker } from "./coffee-maker";
import { Bag } from "./bag";

export async function initObjects(scene: Scene) {
  const spoon = new Spoon();
  await spoon.render(scene);

  const mug = new Mug();
  await mug.render(scene);

  const coffeeMaker = new CoffeeMaker();
  await coffeeMaker.render(scene);

  const bag = new Bag();
  await bag.render(scene);

  return {
    spoon,
    mug,
    coffeeMaker,
    bag,
  };
}
