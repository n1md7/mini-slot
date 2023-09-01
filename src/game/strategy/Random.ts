import { Strategy } from '/src/game/strategy/Strategy';
import { Block } from '/src/game/components/reels/components/Block';
import { Random as Randomizer } from '/src/utils/Random';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { Reels } from '/src/game/components/reels/Reels';
import { IMAGE_ASSET } from '/src/game/enums';

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

  public override subscribe() {
    super.subscribe();

    this.addInitialBlocks();
  }

  private addInitialBlocks() {
    for (const reel of this.reels) {
      const capacity = reel.capacity;
      // Override
      reel.capacity = 3;
      reel.addBlock(new Block(this.reelSymbols.get(IMAGE_ASSET.CHERRY)!, IMAGE_ASSET.CHERRY, 0));
      reel.addBlock(new Block(this.reelSymbols.get(IMAGE_ASSET.SEVEN)!, IMAGE_ASSET.SEVEN, 1));
      reel.addBlock(new Block(this.reelSymbols.get(IMAGE_ASSET.BARx3)!, IMAGE_ASSET.BARx3, 2));
      // Restore
      reel.capacity = capacity;
    }
  }
}
