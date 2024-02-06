import { objectIdentifiers } from "./object-identifiers";

export const interactionMap: Record<string, string[]> = {
  [objectIdentifiers.emptySpoon]: [objectIdentifiers.coffeeBag],
  [objectIdentifiers.fullSpoon]: [objectIdentifiers.coffeeBag],
  [objectIdentifiers.fullBottle]: [objectIdentifiers.mug],
};
