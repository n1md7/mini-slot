import { Block } from '/src/game/components/reels/components/Block';
import { Container } from 'pixi.js';

import ms from 'ms';
import { BLOCK, REEL } from '@/src/game/enums';
import { gsap } from 'gsap';
import { Position } from '/src/game/strategy/Fixed';
import { iSubscribe } from '/src/game/interfaces/subscribe';
import GUI from 'lil-gui';

export type ReelOptions = {
  spinTime: `${number} sec`;
  id: 0 | 1 | 2;
};

export type StopType = 'Partial block' | 'Full block';

export class Reel extends Container implements iSubscribe {
  private _blocks: Block[] = [];
  private _spinning = false;
  private _stopAt: StopType = 'Full block';

  constructor(
    private readonly reelOptions: ReelOptions,
    private readonly gui: GUI,
  ) {
    super();

    this.x = reelOptions.id * REEL.WIDTH;
    this.reset();
  }

  public get isSpinning(): boolean {
    return this._spinning;
  }

  private _size = 0;

  private get size(): number {
    return this._blocks.length * BLOCK.HEIGHT;
  }

  private get spinTime(): number {
    return ms(this.reelOptions.spinTime);
  }

  public subscribe() {
    const id = this.reelOptions.id + 1;
    const name = String(id).padStart(2, '0');
    const section = this.gui.addFolder(`Reel ${name}`);
    const options = ['1.0 sec', '1.4 sec', '1.8 sec', '2.2 sec', '2.6 sec', '3.0 sec'];
    section
      .add(this.reelOptions, 'spinTime', options)
      .name('Spin time')
      .onChange((spinTime: `${number} sec`) => {
        this.reelOptions.spinTime = spinTime;
      });
  }

  public stopAtPartial() {
    this._stopAt = 'Partial block';
  }

  public stopAtFull() {
    this._stopAt = 'Full block';
  }

  public setStopAtByPosition(position: Position) {
    if (position === 'Middle') return this.stopAtPartial();

    this.stopAtFull();
  }

  async spin() {
    const PartialStop = this._stopAt === 'Partial block';
    const partial = this.size - BLOCK.HEIGHT / 2;
    const stopAt = PartialStop ? partial : this.size;
    this._spinning = true;
    await gsap
      .to(this, {
        pixi: { y: stopAt },
        duration: this.spinTime / 1000,
        ease: `back.out(0.4)`,
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
    this._blocks = [];
    this.removeChildren();
  }

  public reset() {
    this.clearBlocks();
    this.y = this.size + 2 * BLOCK.HEIGHT;
    this._size = 0;
    Math.random() > 0.5 ? this.stopAtPartial() : this.stopAtFull();
  }
}
