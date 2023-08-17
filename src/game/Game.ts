import { Reel } from '/src/game/components/reel/Reel';
import { Setup } from '/src/game/Setup';
import { Strategy } from '/src/game/strategy/Strategy';
import { Random } from '/src/game/strategy/Random';
import { IMAGE_ASSET } from '/src/game/enums';
import { Fixed } from '/src/game/strategy/Fixed';

export type FixedType = {
  position: 'top' | 'middle' | 'bottom';
  symbol: IMAGE_ASSET;
};
export class Game extends Setup {
  private static instance: Game;

  private reels: Reel[] = [];
  private mode: Strategy;
  private modes: {
    Random: Strategy;
    Fixed: Fixed;
  };
  private readonly fixed: FixedType = {};

  private constructor() {
    super();

    this.createPixiApplication();
    this.renderSpinner();
    this.modes = {
      Random: new Random(this.reels, this.slotSymbols, this.fixed),
      Fixed: new Fixed(this.reels, this.slotSymbols, this.fixed),
    };
    this.mode = this.modes.Fixed;
    this.fixed.position = 'top';
    this.fixed.symbol = IMAGE_ASSET.SEVEN;
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  public override start(): void {
    super.start();

    this.hideSpinner();
    this.attachReels();
    this.drawStoppingLines();
  }

  public attachControls(spin: HTMLButtonElement): void {
    spin.addEventListener('click', async () => {
      if (this.stillRunning()) return;

      this.mode.reset();
      this.mode.addBlocks();
      await this.mode.spin();
    });
  }

  private stillRunning(): boolean {
    return this.reels.some((reel) => reel.isSpinning);
  }

  private attachReels() {
    this.reels.push(new Reel({ spinTime: '1.0 sec', id: 0 }));
    this.reels.push(new Reel({ spinTime: '1.4 sec', id: 1 }));
    this.reels.push(new Reel({ spinTime: '1.8 sec', id: 2 }));
    this.app.stage.addChild(...this.reels);
  }
}
