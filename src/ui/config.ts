import { Color3 } from "@babylonjs/core";
import { objectIdentifiers } from "../common/object-identifiers";

export const PICKABLE_OBJECTS = [
  objectIdentifiers.fullBottle,
  objectIdentifiers.emptySpoon,
  objectIdentifiers.fullSpoon,
];

export const DEFAULT_HIGHLIGHT_COLOR = Color3.FromInts(3, 144, 252);
