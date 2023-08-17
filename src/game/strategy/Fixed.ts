import { Strategy } from '/src/game/strategy/Strategy';
import { Reel } from '/src/game/components/reel/Reel';
import { Symbols } from '/src/game/components/reel/components/Symbols';
import { FixedType } from '/src/game/Game';
import { Random as Randomizer } from '/src/utils/random';
import { Block } from '/src/game/components/reel/components/Block';

export class Fixed extends Strategy {
  constructor(reels: Reel[], reelSymbols: Symbols, fixed: FixedType) {
    super(reels, reelSymbols, fixed);
  }

  addBlocks() {
    for (const [idx, reel] of this.reels.entries()) {
      this.fixed.position === 'middle' ? reel.stopAtPartial() : reel.stopAtFull();
      const symbols = Randomizer.pick(this.symbols, (idx + 1) * 8);
      const index = this.getIndex(symbols.length);
      for (const { val, idx } of symbols) {
        const value = idx === index ? this.fixed.symbol : val;
        reel.addBlock(new Block(this.reelSymbols.get(value)!, idx));
      }
    }
  }

  private getIndex(size: number) {
    if (this.fixed.position === 'top') return size - 1;
    return size - 2;
  }
}
