import { Sprite, Texture, Graphics } from 'pixi.js';
import { BLOCK, IMAGE_ASSET } from '@/src/game/enums';

export class Block extends Graphics {
  public readonly _id: number;
  private readonly _key: IMAGE_ASSET;

  constructor(texture: Texture, key: IMAGE_ASSET, id: number) {
    super();

    this._id = id;
    this._key = key;

    this.width = BLOCK.WIDTH;
    this.height = BLOCK.HEIGHT;

    this.lineStyle(BLOCK.LINE_THICKNESS, '#6A6E6AE8', 1);
    this.drawRect(0, 0, BLOCK.WIDTH, BLOCK.HEIGHT);
    this.endFill();
    this.zIndex = 1;

    const sprite = new Sprite(texture);

    sprite.width = Block.reduce(BLOCK.WIDTH).by(30);
    sprite.height = Block.reduce(BLOCK.HEIGHT).by(30);

    sprite.x = this.alignX(sprite);
    sprite.y = this.alignY(sprite);

    this.addChild(sprite);
  }

  get id() {
    return this._id;
  }

  get key() {
    return this._key;
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

  private alignX(sprite: Sprite) {
    return (this.width - sprite.width) / 2;
  }

  private alignY(sprite: Sprite) {
    return (this.height - sprite.height) / 2;
  }
}
