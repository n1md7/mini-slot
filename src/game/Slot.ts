import { Reel } from './Reel';
import { CanvasOptions } from './Canvas';
import { Random } from '../utils/Random';
import { ReelBlock } from './ReelBlock';

export enum Mode {
  Tester,
  Random,
}

type SlotOptions = Pick<CanvasOptions, 'width' | 'height'> & {
  image: {
    BARx1: {
      key: string;
      val: HTMLImageElement;
    };
    BARx2: {
      key: string;
      val: HTMLImageElement;
    };
    BARx3: {
      key: string;
      val: HTMLImageElement;
    };
    Seven: {
      key: string;
      val: HTMLImageElement;
    };
    Cherry: {
      key: string;
      val: HTMLImageElement;
    };
  };
  audio: {
    Win: HTMLAudioElement;
    Spin: HTMLAudioElement;
  };
};

export class Slot {
  private updatedAt: number = 0;

  private autoSpin: NonNullable<boolean>;
  private credits: NonNullable<number>;
  private mode: NonNullable<Mode>;

  private reels: [Reel, Reel, Reel] | null = null;
  private readonly reelSkipPixels = 32;

  constructor(protected readonly ctx: CanvasRenderingContext2D, protected readonly options: SlotOptions) {
    this.credits = 300;
    this.autoSpin = false;
    this.mode = Mode.Random;
  }

  public static get FPS(): number {
    return 10;
  }

  private get reelWidth(): number {
    return this.options.width / 3; // 3 reels
  }

  private get reelHeight(): number {
    return this.options.height; // Same as Canvas height
  }

  private get interval(): number {
    return 1000 / Slot.FPS;
  }

  public timeToTick(now: number): boolean {
    return this.getDelta(now) > this.interval;
  }

  public updateTimestamp(now: number): void {
    this.updatedAt = now - (this.getDelta(now) % this.interval);
  }

  public addCredits(credits: number) {
    this.credits += credits;
  }

  public setup(optionalCallback = () => void 0): Slot {
    console.info('Setup initiated');

    this.attachReels();

    for (const reel of this.reels!) {
      reel.clear();
      reel.addBlocks(this.blocks());
      reel.renderView();

      setTimeout(() => {
        for (const reel of this.reels!) reel.spin();
      });
    }

    optionalCallback();

    return this;
  }

  public loop(now: number) {
    if (!this.reels) throw new TypeError('Reels not defined. Make sure you call "setup" before "loop"!');
    for (const reel of this.reels) {
      if (reel.isStopped()) break;

      const delta = now - reel.getStartedAt();
      const timeToStop = delta > reel.getSpinTime();

      if (timeToStop) reel.stopASAP();

      if (reel.isSpinning()) reel.renderView();
      if (reel.isStopping()) {
        reel.slowDown();
        reel.renderView();
      }

      if (reel.outOfBlocks()) reel.addBlocks(this.blocks());
    }
  }

  private blocks() {
    return Random.shuffleList<ReelBlock>([
      new ReelBlock(this.options.image.BARx1.val, this.reelHeight),
      new ReelBlock(this.options.image.BARx2.val, this.reelHeight),
      new ReelBlock(this.options.image.BARx3.val, this.reelHeight),
      new ReelBlock(this.options.image.Seven.val, this.reelHeight),
      new ReelBlock(this.options.image.Cherry.val, this.reelHeight),
    ]);
  }

  private getDelta(now: number): number {
    return now - this.updatedAt;
  }

  private attachReels(): void {
    const options: CanvasOptions = {
      width: this.reelWidth,
      height: this.reelHeight,
    };

    const blockHeight = this.reelHeight / 2;
    const skipPixels = this.reelSkipPixels;

    this.reels = [
      new Reel(this.ctx, options, { spinTime: '2.0 sec', reelIndex: 0, blockHeight, skipPixels }),
      new Reel(this.ctx, options, { spinTime: '2.4 sec', reelIndex: 1, blockHeight, skipPixels }),
      new Reel(this.ctx, options, { spinTime: '2.8 sec', reelIndex: 2, blockHeight, skipPixels }),
    ];

    console.info('Reels attached');
  }
}
