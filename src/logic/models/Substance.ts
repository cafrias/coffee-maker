import { Sample } from "./Sample";

export class Substance {
  private contents: Map<string, Sample>;

  constructor(contents: Map<string, Sample> = new Map<string, Sample>()) {
    this.contents = contents;
  }

  addSample(sample: Sample): void {
    const id = sample.material.getId();
    if (this.contents.has(id)) {
      const existingSample = this.contents.get(id);
      this.contents.set(id, (existingSample as Sample).add(sample));
    } else {
      this.contents.set(id, sample);
    }
  }

  removeSample(sample: Sample): void {
    const id = sample.material.getId();
    if (!this.contents.has(id)) {
      throw new Error("Sample not found");
    }

    const existingSample = this.contents.get(id);
    const newSample = (existingSample as Sample).remove(sample);
    if (newSample.isEmpty()) {
      this.contents.delete(id);
    } else {
      this.contents.set(id, newSample);
    }
  }

  isEmpty(): boolean {
    return this.contents.size === 0;
  }

  totalAmount(): number {
    // FIXME: we are potentially adding different measurement units
    return Array.from(this.contents.values()).reduce(
      (acc, sample) => acc + sample.amount,
      0
    );
  }
}
