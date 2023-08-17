import { Strategy } from '/src/game/strategy/Strategy';
import { Block } from '/src/game/components/reel/components/Block';
import { Random as Randomizer } from '/src/utils/random';
import { Reel } from '/src/game/components/reel/Reel';
import { Symbols } from '/src/game/components/reel/components/Symbols';
import { FixedType } from '/src/game/Game';

export class Random extends Strategy {
  constructor(reels: Reel[], reelSymbols: Symbols, fixed: FixedType) {
    super(reels, reelSymbols, fixed);
  }

  public addBlocks(): void {
    for (const [idx, reel] of this.reels.entries()) {
      const symbols = Randomizer.pick(this.symbols, (idx + 1) * 8);
      for (const { val, idx } of symbols) {
        reel.addBlock(new Block(this.reelSymbols.get(val)!, idx));
      }
    }
  }
}
