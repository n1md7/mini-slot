import { IMAGE_ASSET } from '/src/game/enums';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { Reels } from '/src/game/components/reels/Reels';
import { Calculator } from '/src/game/Calculator';
import { Block } from '/src/game/components/reels/components/Block';
import { bet } from '/src/ui/store';

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
    const lines = this.reels.extractLines();

    // No win whe we have a mixed line-stop
    if (!this.reels.stoppedAtSamePosition()) return 0;

    if (this.reels.stoppedAtPartialPosition()) {
      // We only calculate middle line if we have a partial stop
      // 1st and 3rd lines are partially visible
      // 2nd line is fully visible
      const middle = this.calculateMiddleLine(lines.second);
      if (middle > 0) {
        // We have a win and apply filter
        lines.second.forEach((block) => block.highlightWinnerLine());

        return middle * bet();
      }

      return 0;
    }

    // Full-line position stop
    // 1st and 2nd lines are fully visible, 3rd line is hidden (not calculating that at all)
    const top = this.calculateTopLine(lines.first);
    const bottom = this.calculateBottomLine(lines.second);

    if (top > 0) lines.first.forEach((block) => block.highlightWinnerLine());
    if (bottom > 0) lines.second.forEach((block) => block.highlightWinnerLine());

    return (top + bottom) * bet();
  }

  public subscribe() {}

  public unsubscribe() {}

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
