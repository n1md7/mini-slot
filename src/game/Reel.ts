import { Canvas, CanvasOptions } from './Canvas';
import ms from 'ms';
import { Random } from '../utils/Random';
import { ReelBlock } from './ReelBlock';

export enum ReelStatus {
  Spinning,
  Stopped,
  Stopping,
}

export type ReelOptions = {
  spinTime: `${number} sec`;
  reelIndex: 0 | 1 | 2;
  blockHeight: number;
  skipPixels: number;
};

export class Reel extends Canvas {
  private startedAt: NonNullable<number>;
  private status: NonNullable<ReelStatus>;
  private blocks: ReelBlock[] = [];
  private invalidBlocks = 0;
  private top: number = 0;
  private currentSkip = 0;

  constructor(
    protected readonly ctx: CanvasRenderingContext2D,
    protected readonly canvasOptions: CanvasOptions,
    private readonly reelOptions: ReelOptions,
  ) {
    super(ctx, canvasOptions);

    this.startedAt = -1;
    this.reelOptions = reelOptions;
    this.status = ReelStatus.Stopped;
    this.currentSkip = reelOptions.skipPixels;
  }

  public get index(): number {
    return this.reelOptions.reelIndex;
  }

  private get offsetX(): number {
    return this.reelOptions.reelIndex * this.width;
  }

  public outOfBlocks() {
    return this.invalidBlocks >= this.blocks.length;
  }

  public addBlocks(blocks: ReelBlock[]): void {
    for (const block of blocks) this.blocks.push(block);
  }

  public clearBlocks() {
    this.blocks = [];
  }

  public shuffle(): void {
    Random.shuffleList(this.blocks);
  }

  public getSpinTime(): number {
    return ms(this.reelOptions.spinTime);
  }

  public setStartedAt(time: number): void {
    this.startedAt = time;
  }

  public getStartedAt(): number {
    return this.startedAt;
  }

  public isSpinning() {
    return this.status === ReelStatus.Spinning;
  }

  public isStopping() {
    return this.status === ReelStatus.Stopping;
  }

  public isStopped() {
    return this.status === ReelStatus.Stopped;
  }

  public stop() {
    this.status = ReelStatus.Stopped;
  }

  public stopASAP() {
    this.status = ReelStatus.Stopping;
  }

  public spin() {
    this.status = ReelStatus.Spinning;
  }

  public slowDown() {
    this.currentSkip = this.currentSkip - this.currentSkip * 0.05;
    if (this.currentSkip === 0) this.stop();
  }

  public renderView(): void {
    this.top += this.currentSkip;

    this.clear();
    this.blocks.forEach((block, index) => {
      block.setOffsetY(this.top, index);
      if (block.inRange()) {
        this.drawBlock(block.image, block.getOffsetY());
      } else {
        this.invalidBlocks++;
      }
    });
  }

  public override drawBlock(image: HTMLImageElement, offsetY: number): void {
    super.drawBlock(image, this.offsetX, offsetY);
  }

  public override clear(): void {
    super.clear(this.offsetX, 0);
  }
}
