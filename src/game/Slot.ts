import { Reel } from './Reel';
import { CanvasOptions } from './Canvas';

export enum Mode {
  Tester,
  Random,
}

type SlotOptions = Pick<CanvasOptions, 'width' | 'height'> & {
  image: {
    BARx1: HTMLImageElement;
    BARx2: HTMLImageElement;
    BARx3: HTMLImageElement;
    Seven: HTMLImageElement;
    Cherry: HTMLImageElement;
  };
  audio: {
    Win: HTMLAudioElement;
    Spin: HTMLAudioElement;
  };
};

export class Slot {
  private updatedAt: number = 0;

  private top = 0;

  private autoSpin: NonNullable<boolean>;
  private credits: NonNullable<number>;
  private mode: NonNullable<Mode>;

  private reels: [Reel, Reel, Reel] | null = null;

  constructor(protected readonly ctx: CanvasRenderingContext2D, protected readonly options: SlotOptions) {
    this.credits = 300;
    this.autoSpin = false;
    this.mode = Mode.Random;
  }

  private get reelWidth(): number {
    return this.options.width / 3; // 3 reels
  }

  private get reelHeight(): number {
    return this.options.height; // Same as Canvas height
  }

  public static get FPS(): number {
    return 60;
  }

  public get interval(): number {
    return 1000 / Slot.FPS;
  }

  public getDelta(now: number): number {
    return now - this.updatedAt;
  }

  public timeToTick(now: number): boolean {
    return this.getDelta(now) > this.interval;
  }

  public updateTimestamp(now: number): void {
    this.updatedAt = now - (this.getDelta(now) % this.interval);
  }

  private attachReels(): void {
    const options: CanvasOptions = {
      width: this.reelWidth,
      height: this.reelHeight,
    };

    this.reels = [
      new Reel(this.ctx, options, { spinTime: '2.0s', reelIndex: 0 }),
      new Reel(this.ctx, options, { spinTime: '2.4s', reelIndex: 1 }),
      new Reel(this.ctx, options, { spinTime: '2.8s', reelIndex: 2 }),
    ];

    console.info('Reels attached');
  }

  public addCredits(credits: number) {
    this.credits += credits;
  }

  public setup(optionalCallback = () => void 0): Slot {
    console.info('Setup initiated');

    this.attachReels();

    optionalCallback();

    return this;
  }

  public loop(now: number) {
    if (!this.reels) throw new TypeError('Reels not defined. Make sure you call "setup" before "loop"!');
    for (const reel of this.reels) {
      const delta = now - reel.getStartedAt();
      const timeToStop = delta > reel.getSpinTime();
      if (timeToStop) reel.stop();
      else {
        reel.clear();
        reel.drawImage(this.options.image.BARx2, this.top);
      }
    }
    this.top += 2;
  }
}
