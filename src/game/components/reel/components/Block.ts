import { Sprite, Texture, Graphics } from 'pixi.js';
import { BLOCK } from '/src/game/enums';

export class Block extends Graphics {
  constructor(texture: Texture, public readonly id: number) {
    super();

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
