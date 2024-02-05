import "./main.css";

import "@babylonjs/loaders/OBJ";
import { initUI } from "./ui";

async function main() {
  const canvas = document.getElementById("appCanvas");
  if (!canvas) {
    throw new Error("Canvas not found");
  }

  await initUI(canvas as HTMLCanvasElement);
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});
