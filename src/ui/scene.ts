// import { Inspector } from "@babylonjs/inspector";
import {
  Scene as BabylonScene,
  Color3,
  Engine,
  HighlightLayer,
  Mesh,
} from "@babylonjs/core";
import { DEFAULT_HIGHLIGHT_COLOR } from "./config";
import { isDefined } from "../utils/isDefined";

export class Scene extends BabylonScene {
  private hl: HighlightLayer;

  constructor(engine: Engine) {
    super(engine);

    this.createDefaultLight();
    const helper = this.createDefaultEnvironment({
      createSkybox: false,
      createGround: false,
      environmentTexture:
        "https://playground.babylonjs.com/textures/Studio_Softbox_2Umbrellas_cube_specular.env",
    });
    helper?.setMainColor(Color3.White());

    // Add the highlight layer.
    this.hl = new HighlightLayer("hl1", this);

    // Inspector.Show(this, {});
  }

  highlightMeshes(meshes: string[]) {
    meshes
      .map((id) => this.getMeshById(id))
      .filter(isDefined)
      .forEach((mesh) => {
        this.hl.addMesh(mesh as Mesh, DEFAULT_HIGHLIGHT_COLOR);
      });
  }

  clearHighlights() {
    this.hl.removeAllMeshes();
  }
}
