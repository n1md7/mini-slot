import { Graphics } from 'pixi.js';

export class Point extends Graphics {
  static width = 8;
  static height = 4;
  constructor(x: number, y: number) {
    super();

    this.y = y - Point.height / 2;
    this.x = x;

    this.beginFill('#7691dc', 0.8);
    this.drawRoundedRect(0, 0, Point.width, Point.height, 4);
    this.endFill();
    this.zIndex = 2;
  }
}
