import { Reel } from './Reel';

export enum Mode {
  Tester,
  Random,
}

export class Slot {
  private autoSpin: boolean;
  private credits: number;
  private mode: Mode;
  private delta: number;

  constructor(private readonly reels: [Reel, Reel, Reel]) {
    this.autoSpin = false;
    this.credits = 300;
    this.mode = Mode.Random;
    this.delta = -1;
  }

  public addCredits(credits: number) {
    this.credits += credits;
  }

  public loop(now: number) {
    for (const reel of this.reels) {
      const delta = now - reel.getStartedAt();
      if (delta > reel.getSpinTime()) {
        reel.stop();
        // TODO: add implementation here
      }
    }
  }

  public setup() {
    console.log("Run's on startup once");
  }
}
