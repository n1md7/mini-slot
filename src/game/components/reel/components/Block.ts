import { Sprite, Texture } from 'pixi.js';
import { BLOCK, REEL } from '/src/game/enums';

export class Block extends Sprite {
  constructor(texture: Texture) {
    super(texture);
  }
}
