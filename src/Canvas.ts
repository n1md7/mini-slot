export type CanvasOptions = {
  reel: {
    height: number;
    width: number;
  };
  offsetX: 0 | 1 | 2;
  margin: number;
}

export abstract class Canvas {
  protected constructor(
    protected readonly ctx: CanvasRenderingContext2D,
    protected readonly options: CanvasOptions,
  ) {}

  drawImage(image: HTMLImageElement, offsetY: number): void {
    const { reel: { width, height }, margin } = this.options;
    const offsetX = this.options.offsetX * width + margin;
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 4;
    this.ctx.fillRect(offsetX, offsetY, width, height / 2);
    this.ctx.strokeRect(offsetX, offsetY, width, height / 2);
    this.ctx.drawImage(image, offsetX, offsetY);
  }

  clear() {
    const { reel: { width, height }, margin } = this.options;
    const offsetX = this.options.offsetX * width + margin;
    this.ctx.clearRect(offsetX, height, width, height);
  }
}