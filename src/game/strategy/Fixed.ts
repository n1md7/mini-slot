import { Strategy } from '/src/game/strategy/Strategy';
import { Reel } from '/src/game/components/reel/Reel';
import { Symbols } from '/src/game/components/reel/components/Symbols';
import { Random as Randomizer } from '/src/utils/random';
import { Block } from '/src/game/components/reel/components/Block';
import { IMAGE_ASSET } from '/src/game/enums';

export type Position = 'Top' | 'Middle' | 'Bottom';
export class Fixed extends Strategy {
  private position: Position;
  private symbol: IMAGE_ASSET;

  constructor(reels: Reel[], reelSymbols: Symbols) {
    super(reels, reelSymbols);

    this.position = 'Middle';
    this.symbol = IMAGE_ASSET.SEVEN;
  }

  setPosition(position: Position) {
    this.position = position;
  }

  setSymbol(symbol: IMAGE_ASSET) {
    this.symbol = symbol;
  }

  addBlocks() {
    for (const [idx, reel] of this.reels.entries()) {
      reel.setStopAtByPosition(this.position);
      const symbols = Randomizer.pick(this.symbols, (idx + 1) * 8);
      const index = this.getIndex(symbols.length);
      for (const { val, idx } of symbols) {
        const value = idx === index ? this.symbol : val;
        reel.addBlock(new Block(this.reelSymbols.get(value)!, idx));
      }
    }
  }

  private getIndex(size: number) {
    if (this.position === 'Top') return size - 1;
    return size - 2;
  }
}
