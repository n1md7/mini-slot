export type CanvasOptions = {
  width: number;
  height: number;
};

export abstract class Canvas {
  protected constructor(protected readonly ctx: CanvasRenderingContext2D, protected readonly options: CanvasOptions) {}

  protected get width(): number {
    return this.options.width;
  }

  protected get height(): number {
    return this.options.height;
  }

  protected drawBlock(image: HTMLImageElement, x: number, y: number): void {
    this.ctx.strokeStyle = 'rgb(58,3,3)';
    this.ctx.strokeRect(x, y, this.width, this.height);
    this.ctx.drawImage(image, x, y);
  }

  protected clear(x: number, y: number): void {
    this.ctx.clearRect(x, y, this.width, this.height);
  }
}
