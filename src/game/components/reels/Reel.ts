import { Block } from '/src/game/components/reels/components/Block';
import { iSubscribe } from '/src/game/interfaces/subscribe';
import { iUnsubscribe } from '/src/game/interfaces/unsubscribe';
import { iInit } from '/src/game/interfaces/init';
import { StopAt } from '/src/game/components/reels/StopAt';
import { BLOCK, REEL } from '@/src/game/enums';
import { Container } from 'pixi.js';
import { gsap } from 'gsap';
import GUI from 'lil-gui';
import ms from 'ms';
import { Animations } from '/src/game/components/reels/components/Animations';

export type ReelOptions = {
  spinTime: `${number} sec`;
  id: 0 | 1 | 2;
};

export class Reel extends Container implements iSubscribe, iUnsubscribe, iInit {
  public capacity: number;

  private _spinning: boolean;

  private readonly _blocks: Block[];
  private readonly _stopAt: StopAt;

  constructor(
    private readonly reelOptions: ReelOptions,
    private readonly gui: GUI,
    private readonly animations: Animations,
  ) {
    super();

    this._spinning = false;
    this._blocks = [];
    this._stopAt = new StopAt();

    this.x = reelOptions.id * REEL.WIDTH;
    // By default reels have 8, 16, 24 blocks
    this.capacity = (reelOptions.id + 1) * 8;
    this.reset();
  }

  get stopAt() {
    return this._stopAt;
  }

  public get isSpinning(): boolean {
    return this._spinning;
  }

  public get blocks(): Block[] {
    return this._blocks;
  }

  private _size = 0;

  private get size(): number {
    return this._blocks.length * BLOCK.HEIGHT;
  }

  private get spinTime(): number {
    return ms(this.reelOptions.spinTime);
  }

  public init() {
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
    section.add(this, 'capacity', 8, 64, 1).name('Block capacity');
  }

  public subscribe() {
    this.visible = true;
  }

  public unsubscribe() {
    this.visible = false;
  }

  public stopAtEquals(...reels: Reel[]) {
    return reels.every((reel) => this.stopAt.equals(reel.stopAt));
  }

  async spin() {
    this._spinning = true;
    await gsap
      .to(this, {
        pixi: { y: this.getCalculatedStopAtPoint() },
        duration: this.getCalculatedSpinTime(),
        ease: this.animations.getCurrentValue(),
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
    this._blocks.length = 0;
    this.removeChildren();
  }

  public update(_delta: number, _elapsedMS: number) {
    for (const block of this._blocks) {
      block.update(_delta, _elapsedMS);
    }
  }

  public reset() {
    this.clearBlocks();
    this.y = this.size + 2 * BLOCK.HEIGHT;
    this._size = 0;
    this.stopAt.chooseRandomly();
  }

  private getCalculatedStopAtPoint() {
    if (this.stopAt.isPartial()) {
      return this.size - BLOCK.HEIGHT / 2;
    }

    return this.size;
  }

  private getCalculatedSpinTime() {
    return this.spinTime / 1000;
  }
}
