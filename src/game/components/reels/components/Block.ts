import { Sprite, Texture, Graphics } from 'pixi.js';
import { BLOCK, IMAGE_ASSET } from '/src/game/enums';
import { Highlight } from '/src/game/components/reels/filters/Highlight';
import { CRT } from '/src/game/components/reels/filters/CRT';

export class Block extends Graphics {
  private readonly _id: number;
  private readonly _key: IMAGE_ASSET;
  private readonly _sprite: Sprite;
  private readonly _default: CRT;
  private readonly _highlight: Highlight;

  constructor(texture: HTMLImageElement, key: IMAGE_ASSET, id: number) {
    super();

    this._id = id;
    this._key = key;

    this.width = BLOCK.WIDTH;
    this.height = BLOCK.HEIGHT;

    this.lineStyle(BLOCK.LINE_THICKNESS, '#6A6E6AE8', 0.05);
    this.drawRect(0, 0, BLOCK.WIDTH, BLOCK.HEIGHT);
    this.endFill();
    this.zIndex = 1;

    this._sprite = new Sprite(texture as unknown as Texture);

    this._sprite.width = Block.reduce(BLOCK.WIDTH).by(30);
    this._sprite.height = Block.reduce(BLOCK.HEIGHT).by(30);

    this._sprite.x = this.alignX(this._sprite);
    this._sprite.y = this.alignY(this._sprite);

    this.addChild(this._sprite);

    this._highlight = new Highlight();
    this._default = new CRT();

    this._sprite.filters = [this._default.filter];
  }

  get id() {
    return this._id;
  }

  get key() {
    return this._key;
  }

  get isBARx1() {
    return this.key === IMAGE_ASSET.BARx1;
  }

  get isBARx2() {
    return this.key === IMAGE_ASSET.BARx2;
  }

  get isBARx3() {
    return this.key === IMAGE_ASSET.BARx3;
  }

  get isAnyBAR() {
    return this.isBARx1 || this.isBARx2 || this.isBARx3;
  }

  get isSeven() {
    return this.key === IMAGE_ASSET.SEVEN;
  }

  get isCherry() {
    return this.key === IMAGE_ASSET.CHERRY;
  }

  get isSevenOrCherry() {
    return this.isSeven || this.isCherry;
  }

  private static reduce(val: number) {
    return {
      by(percent: number) {
        return val - (val * percent) / 100;
      },
    };
  }

  equals(...blocks: Block[]) {
    return blocks.every((block) => block.key === this.key);
  }

  highlightWinnerLine() {
    this._sprite.filters = [this._highlight.filter];
  }

  update(_delta: number, _elapsedMS: number) {
    this._highlight.update(_delta, _elapsedMS);
    this._default.update(_delta, _elapsedMS);
  }

  private alignX(sprite: Sprite) {
    return (this.width - sprite.width) / 2;
  }

  private alignY(sprite: Sprite) {
    return (this.height - sprite.height) / 2;
  }
}
