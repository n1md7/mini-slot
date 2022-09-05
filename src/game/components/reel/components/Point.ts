import { Graphics } from 'pixi.js';

export class Point extends Graphics {
  static width = 8;
  constructor(x: number, y: number) {
    super();

    this.y = y;
    this.x = x;

    this.beginFill(0xffffff, 0.5);
    this.drawRect(0, 0, Point.width, 4);
    this.endFill();
  }
}
