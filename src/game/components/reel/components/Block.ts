export class Block {
  private offsetY: number = Number.MAX_SAFE_INTEGER;
  private readonly blockHeight: number;

  constructor(public readonly image: HTMLImageElement, private readonly reelHeight: number) {
    this.blockHeight = reelHeight / 2;
  }

  setOffsetY(offsetY: number, index: number) {
    this.offsetY = offsetY - this.blockHeight * index;
  }

  getOffsetY() {
    return this.offsetY;
  }

  outOfRange(): boolean {
    return this.reelHeight < this.offsetY;
  }

  inRange(): boolean {
    return !this.outOfRange();
  }
}
