import { Scene as BabylonScene, Color3, Engine } from "@babylonjs/core";

export class Scene extends BabylonScene {
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
  }
}
