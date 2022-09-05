import { Sprite, Texture, Graphics } from 'pixi.js';
import { BLOCK } from '/src/game/enums';

export class Block extends Graphics {
  constructor(texture: Texture, public readonly id: number) {
    super();

    this.y = BLOCK.HEIGHT * -id;

    this.width = BLOCK.WIDTH;
    this.height = BLOCK.HEIGHT;

    this.lineStyle(2, 0xfee000, 1);
    this.beginFill(0xff0000, 0.01);
    this.drawRect(0, 0, BLOCK.WIDTH, BLOCK.HEIGHT);
    this.endFill();

    const sprite = new Sprite(texture);

    sprite.width = Block.reduce(BLOCK.WIDTH).by(20);
    sprite.height = Block.reduce(BLOCK.HEIGHT).by(20);

    sprite.x = this.alignX(sprite);
    sprite.y = this.alignY(sprite);

    this.addChild(sprite);
  }

  private static reduce(val: number) {
    return {
      by(percent: number) {
        return val - (val * percent) / 100;
      },
    };
  }

  private alignX(sprite: Sprite) {
    return (this.width - sprite.width) / 2;
  }

  private alignY(sprite: Sprite) {
    return (this.height - sprite.height) / 2;
  }
}
