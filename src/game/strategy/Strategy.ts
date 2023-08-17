import { Reel } from '/src/game/components/reel/Reel';
import { IMAGE_ASSET } from '/src/game/enums';
import { Symbols } from '/src/game/components/reel/components/Symbols';

export abstract class Strategy {
  public readonly symbols = [
    IMAGE_ASSET.SEVEN,
    IMAGE_ASSET.CHERRY,
    IMAGE_ASSET.BARx1,
    IMAGE_ASSET.BARx2,
    IMAGE_ASSET.BARx3,
  ];

  protected constructor(
    protected readonly reels: Reel[],
    protected readonly reelSymbols: Symbols,
  ) {}

  abstract addBlocks(): void;

  public async spin() {
    const spins = this.reels.map((reel) => reel.spin());

    await Promise.all(spins);
  }

  public reset() {
    for (const reel of this.reels) {
      reel.reset();
    }
  }
}
