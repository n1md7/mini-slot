import { IMAGE_ASSET } from '/src/game/enums';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { Reels } from '/src/game/components/reels/Reels';
import { Calculator } from '/src/game/Calculator';
import { Block } from '/src/game/components/reels/components/Block';

export abstract class Strategy {
  public readonly symbols = [
    IMAGE_ASSET.SEVEN,
    IMAGE_ASSET.CHERRY,
    IMAGE_ASSET.BARx1,
    IMAGE_ASSET.BARx2,
    IMAGE_ASSET.BARx3,
  ];
  private readonly calculator: Calculator;

  protected constructor(
    protected readonly reels: Reels,
    protected readonly reelSymbols: Symbols,
  ) {
    this.calculator = new Calculator();
  }

  abstract addBlocks(): void;

  public async spin() {
    if (this.reels.areRunning()) return;

    this.reset();
    this.addBlocks();

    const spins: Promise<void>[] = [];
    for (const reel of this.reels) {
      spins.push(reel.spin());
    }

    await Promise.all(spins);
  }

  public reset() {
    for (const reel of this.reels) {
      reel.reset();
    }
  }

  calculatePayout() {
    const [reel01, reel02, reel03] = this.reels.toArray();
    const [block01, block11, block21] = reel01.getBlocks();
    const [block02, block12, block22] = reel02.getBlocks();
    const [block03, block13, block23] = reel03.getBlocks();

    const firstLine = [block01, block02, block03];
    const secondLine = [block11, block12, block13];

    console.log(block01.key, block02.key, block03.key);
    console.log(block11.key, block12.key, block13.key);
    console.log(block21.key, block22.key, block23.key);
    console.log('-------------------');

    if (!this.reels.stoppedAtSamePosition()) return 0;

    if (this.reels.stoppedAtPartialPosition()) {
      // We only calculate middle line if we have a partial stop
      const middle = this.calculateMiddleLine(secondLine);
      if (middle > 0) {
        // We have a win and apply filter
        secondLine.forEach((block) => block.highlightWinnerLine());

        return middle;
      }
    }

    const top = this.calculateTopLine(firstLine);
    const bottom = this.calculateBottomLine(secondLine);
    if (top > 0) firstLine.forEach((block) => block.highlightWinnerLine());
    if (bottom > 0) secondLine.forEach((block) => block.highlightWinnerLine());

    return top + bottom;
  }

  public subscribe() {}

  public hideGui() {}

  public showGui() {}

  private calculateMiddleLine(middleLine: Block[]) {
    return this.calculator.calculate(middleLine, 'Middle');
  }

  private calculateTopLine(topLine: Block[]) {
    return this.calculator.calculate(topLine, 'Top');
  }

  private calculateBottomLine(bottomLine: Block[]) {
    return this.calculator.calculate(bottomLine, 'Bottom');
  }
}
