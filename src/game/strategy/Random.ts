import { Strategy } from '/src/game/strategy/Strategy';
import { Block } from '/src/game/components/reels/components/Block';
import { Random as Randomizer } from '/src/utils/random';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { Reels } from '/src/game/components/reels/Reels';

export class Random extends Strategy {
  constructor(reels: Reels, reelSymbols: Symbols) {
    super(reels, reelSymbols);
  }

  public addBlocks(): void {
    for (const reel of this.reels) {
      const symbols = Randomizer.pick(this.symbols, reel.capacity);
      for (const { val, idx } of symbols) {
        reel.addBlock(new Block(this.reelSymbols.get(val)!, val, idx));
      }
    }
  }
}
