import { Graphics } from 'pixi.js';

export class Point extends Graphics {
  static width = 8;
  constructor(x: number, y: number) {
    super();

    this.y = y;
    this.x = x;

    this.beginFill('#6A6E6AE8');
    this.drawRect(0, 0, Point.width, 1);
    this.endFill();
    this.zIndex = 2;
  }
}
