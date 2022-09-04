import { Canvas, CanvasOptions } from '../../Canvas';
import ms from 'ms';
import { Random } from '../../../utils/Random';
import { Block } from './components/Block';
import { Container, Texture } from 'pixi.js';

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

export class Reel extends Container {
  private startedAt: NonNullable<number>;
  private status: NonNullable<ReelStatus>;
  private blocks: Block[] = [];
  private invalidBlocks = 0;
  private top: number = 0;
  private currentSkip = 0;

  constructor(protected readonly canvasOptions: CanvasOptions, private readonly reelOptions: ReelOptions) {
    super();

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

  public addBlocks(blocks: Block[]): void {
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
}
