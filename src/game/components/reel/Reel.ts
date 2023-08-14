import { Random } from '@/src/utils/random';
import { Block } from '@/src/game/components/reel/components/Block';
import { Container } from 'pixi.js';

import ms from 'ms';
import { BLOCK, REEL } from '@/src/game/enums';
import { gsap } from 'gsap';

export type ReelOptions = {
  spinTime: `${number} sec`;
  id: 0 | 1 | 2;
};

export class Reel extends Container {
  private _blocks: Block[] = [];
  private _spinning = false;

  constructor(private readonly reelOptions: ReelOptions) {
    super();

    this.x = reelOptions.id * REEL.WIDTH;
    this.reset();
  }

  public get isSpinning(): boolean {
    return this._spinning;
  }

  public get id(): number {
    return this.reelOptions.id;
  }

  private _size = 0;

  private get size(): number {
    return this._blocks.length * BLOCK.HEIGHT;
  }

  private get spinTime(): number {
    return ms(this.reelOptions.spinTime);
  }

  spin() {
    this._spinning = true;
    return gsap
      .to(this, {
        pixi: { y: this.size },
        duration: this.spinTime / 1000,
        ease: 'back.out(0.4)',
      })
      .then(() => {
        this._spinning = false;
      });
  }

  public addBlock(block: Block): void {
    this._blocks.push(block);
    block.y = -this._blocks.length * BLOCK.HEIGHT;
    this._size += BLOCK.HEIGHT + BLOCK.LINE_THICKNESS * 2;
    this.addChild(block);
  }

  public clearBlocks() {
    if (this._blocks.length > 2) this._blocks.length = 3;
    if (this.children.length > 2) this.removeChildren(3);
  }

  public shuffle(): void {
    Random.shuffleList(this._blocks);
  }

  public reset() {
    this.clearBlocks();
    this.y = this.size + 2 * BLOCK.HEIGHT;
    this._size = 0;
  }
}
