import { Random } from '/src/utils/random';
import { Block } from './components/Block';
import { Container } from 'pixi.js';

import ms from 'ms';
import { BLOCK, REEL } from '/src/game/enums';

export type ReelOptions = {
  spinTime: `${number} sec`;
  id: 0 | 1 | 2;
};

export class Reel extends Container {
  private _blocks: Block[] = [];

  constructor(private readonly reelOptions: ReelOptions) {
    super();

    this.x = reelOptions.id * REEL.WIDTH;
    this.y = 0;
  }

  private _size = 0;

  public get size(): number {
    return this._blocks.length * BLOCK.HEIGHT;
  }

  public get id(): number {
    return this.reelOptions.id;
  }

  public get spinTime(): number {
    return ms(this.reelOptions.spinTime);
  }

  private get offsetX(): number {
    return this.reelOptions.id * this.width;
  }

  public addBlock(block: Block): void {
    this._blocks.push(block);
    block.y = -this._blocks.length * BLOCK.HEIGHT;
    this._size += BLOCK.HEIGHT + BLOCK.LINE_THICKNESS * 2;
    this.addChild(block);
  }

  public clearBlocks() {
    this._blocks = [];
    this.removeChildren();
  }

  public shuffle(): void {
    Random.shuffleList(this._blocks);
  }

  public getSpinTime(): number {
    return ms(this.reelOptions.spinTime);
  }

  public reset() {
    this.clearBlocks();
    this.y = (this.size - 1) * BLOCK.HEIGHT;
    this._size = 0;
  }
}
