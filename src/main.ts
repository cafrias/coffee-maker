import "./main.css";

import "@babylonjs/loaders/OBJ";
import { initUI } from "./ui";
import { Bench } from "./logic/models/bench";

async function main() {
  const canvas = document.getElementById("appCanvas");
  if (!canvas) {
    throw new Error("Canvas not found");
  }

  const bench = new Bench();

  await initUI(canvas as HTMLCanvasElement, bench);
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});
