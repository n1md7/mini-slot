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

  calculatePayout() {
    const [reel01, reel02, reel03] = this.reels.toArray();
    const [block01, block11, block21] = reel01.getBlocks();
    const [block02, block12, block22] = reel02.getBlocks();
    const [block03, block13, block23] = reel03.getBlocks();

    // When one of the reels is not stopped at the same stop point, we don't have a WIN
    if (reel01.stopAtEquals(reel02, reel03)) return void 0;

    if (reel01.stopAt.isFull()) {
      // 2nd and 3rd block lines are visible
    } else {
      // 2nd is middle and only can be calculated
    }

    // TODO: take into account Full or Partial stop to compare
    console.log(block01.key, block02.key, block03.key);
    console.log(block11.key, block12.key, block13.key);
    console.log(block21.key, block22.key, block23.key);
    if (block01.equals(block02, block03)) {
      console.log('WIN', block01.key, block02.key, block03.key);
    }
    // if (block11.equals(block12, block13)) {
    //   console.log('WIN', block11.key, block12.key, block13.key);
    // }
    // if (block21.equals(block22, block23)) {
    //   console.log('WIN', block21.key, block22.key, block23.key);
    // }
  }

  public subscribe() {}

  public hideGui() {}

  public showGui() {}
}
