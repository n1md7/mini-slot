import { Canvas, CanvasOptions } from './Canvas';

export enum ReelStatus {
  Spinning,
  Stopped,
}

export type ReelOptions = {
  spinTime: number;
};

export class Reel extends Canvas {
  private startedAt: number;
  private status: ReelStatus;

  private reelOptions: ReelOptions;

  constructor(ctx: CanvasRenderingContext2D, canvasOptions: CanvasOptions, reelOptions: ReelOptions) {
    super(ctx, canvasOptions);

    this.startedAt = -1;
    this.reelOptions = reelOptions;
    this.status = ReelStatus.Stopped;
  }

  public getSpinTime(): number {
    return this.reelOptions.spinTime;
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
}
