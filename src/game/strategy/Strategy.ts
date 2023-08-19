import { IMAGE_ASSET } from '/src/game/enums';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { Reels } from '/src/game/components/reels/Reels';

export abstract class Strategy {
  public readonly symbols = [
    IMAGE_ASSET.SEVEN,
    IMAGE_ASSET.CHERRY,
    IMAGE_ASSET.BARx1,
    IMAGE_ASSET.BARx2,
    IMAGE_ASSET.BARx3,
  ];

  protected constructor(
    protected readonly reels: Reels,
    protected readonly reelSymbols: Symbols,
  ) {}

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

  public subscribe() {}

  public hideGui() {}

  public showGui() {}
}
