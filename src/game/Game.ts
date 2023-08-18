import { Reel } from '/src/game/components/reel/Reel';
import { Setup } from '/src/game/Setup';
import { Strategy } from '/src/game/strategy/Strategy';
import { Random } from '/src/game/strategy/Random';
import { Fixed } from '/src/game/strategy/Fixed';
import { gui } from '/src/utils/gui';

export class Game extends Setup {
  private static instance: Game;

  private reels: Reel[] = [];
  private mode: Strategy;
  private modes: {
    Random: Strategy;
    Fixed: Fixed;
  };
  private gui = gui.addFolder('Game');

  private constructor() {
    super();

    this.createPixiApplication();
    this.renderSpinner();
    this.modes = {
      Random: new Random(this.reels, this.slotSymbols),
      Fixed: new Fixed(this.reels, this.slotSymbols),
    };
    this.mode = this.modes.Fixed;

    this.spin = this.spin.bind(this);
    this.addToGUI();
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
    spin.addEventListener('click', this.spin);
  }

  private async spin() {
    if (this.stillRunning()) return;

    this.mode.reset();
    this.mode.addBlocks();
    await this.mode.spin();
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

  private addToGUI() {
    const positions = ['top', 'middle', 'bottom'];
    const symbols = this.mode.symbols;
    const modes = Object.keys(this.modes);
    const fixedModeDir = this.gui.addFolder('Fixed Mode');
    fixedModeDir.hide();
    fixedModeDir.add(this.mode, 'position', positions).onChange(() => {
      this.mode.reset();
      this.mode.addBlocks();
    });
    fixedModeDir.add(this.mode, 'symbol', symbols).onChange(() => {
      this.mode.reset();
      this.mode.addBlocks();
    });
    this.gui
      .add(this.mode, 'name', modes)
      .setValue('Random')
      .name('Select mode')
      .onChange(() => {
        if (this.mode === this.modes.Fixed) fixedModeDir.show();
        else fixedModeDir.hide();
      });

    this.gui.add(this, 'spin');
  }
}
