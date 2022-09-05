import { Random } from '/src/utils/random';
import { Block } from './components/Block';
import { Container } from 'pixi.js';

import ms from 'ms';
import { REEL } from '/src/game/enums';

export enum ReelStatus {
  Spinning,
  Stopped,
  Stopping,
}

export type ReelOptions = {
  spinTime: `${number} sec`;
  id: 0 | 1 | 2;
};

export class Reel extends Container {
  public blocks: Block[] = [];

  private startedAt: NonNullable<number>;
  private status: NonNullable<ReelStatus>;
  private invalidBlocks = 0;
  private top: number = 0;

  constructor(private readonly reelOptions: ReelOptions) {
    super();

    this.width = REEL.WIDTH;
    this.height = REEL.HEIGHT;

    this.x = reelOptions.id * REEL.WIDTH;
    this.startedAt = -1;
    this.status = ReelStatus.Stopped;
  }

  public get id(): number {
    return this.reelOptions.id;
  }

  public get isSpinning() {
    return this.status === ReelStatus.Spinning;
  }

  public get isStopping() {
    return this.status === ReelStatus.Stopping;
  }

  public get isStopped() {
    return this.status === ReelStatus.Stopped;
  }

  private get offsetX(): number {
    return this.reelOptions.id * this.width;
  }

  public outOfBlocks() {
    return this.invalidBlocks >= this.blocks.length;
  }

  public addBlock(block: Block): void {
    this.blocks.push(block);
    this.addChild(block);
  }

  public addBlocks(blocks: Block[]): void {
    for (const block of blocks) {
      this.addBlock(block);
    }
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

  public stop() {
    this.status = ReelStatus.Stopped;
  }

  public spin() {
    this.status = ReelStatus.Spinning;
  }
}
