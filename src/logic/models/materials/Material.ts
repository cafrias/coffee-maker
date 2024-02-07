import { MatterState } from "../MatterState";

export abstract class Material {
  state: MatterState;

  constructor(state: MatterState) {
    this.state = state;
  }

  getState(): MatterState {
    return this.state;
  }

  abstract getId(): string;
}
