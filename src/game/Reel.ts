import { Canvas, CanvasOptions } from './Canvas';
import ms from 'ms';

export enum ReelStatus {
  Spinning,
  Stopped,
}

export type ReelOptions = {
  spinTime: `${number}s`;
  reelIndex: 0 | 1 | 2;
};

export class Reel extends Canvas {
  private startedAt: NonNullable<number>;
  private status: NonNullable<ReelStatus>;

  constructor(
    protected readonly ctx: CanvasRenderingContext2D,
    protected readonly canvasOptions: CanvasOptions,
    private readonly reelOptions: ReelOptions,
  ) {
    super(ctx, canvasOptions);

    this.startedAt = -1;
    this.reelOptions = reelOptions;
    this.status = ReelStatus.Stopped;
  }

  private get offsetX(): number {
    return this.reelOptions.reelIndex * this.width;
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

  public stop() {
    this.status = ReelStatus.Stopped;
  }

  public spin() {
    this.status = ReelStatus.Spinning;
  }

  public override drawImage(image: HTMLImageElement, offsetY: number): void {
    super.drawImage(image, this.offsetX, offsetY);
  }

  public override clear(): void {
    super.clear(this.offsetX, 0);
  }
}
