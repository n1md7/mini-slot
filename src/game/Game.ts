import { Reel } from '/src/game/components/reel/Reel';
import { Setup } from '/src/game/Setup';
import { Strategy } from '/src/game/strategy/Strategy';
import { Random } from '/src/game/strategy/Random';
import { Fixed, Position } from '/src/game/strategy/Fixed';
import { gui } from '/src/utils/gui';
import { IMAGE_ASSET } from '/src/game/enums';

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
    this.mode = this.modes.Random;

    this.spin = this.spin.bind(this);
    this.addToGUI();
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  public setMode(mode: 'Random' | 'Fixed'): void {
    this.mode = this.modes[mode];
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
    const positions = ['Top', 'Middle', 'Bottom'] as const;
    const symbols = this.mode.symbols;
    const modes = ['Random', 'Fixed'] as const;
    const fixedModeSection = this.gui.addFolder('Fixed Mode');
    fixedModeSection.hide();
    fixedModeSection
      .add(this.mode, 'position', positions)
      .name('Choose position')
      .setValue('Middle')
      .onChange((position: Position) => {
        const mode = this.mode as Fixed;
        mode.reset();
        mode.setPosition(position);
        mode.addBlocks();
      });
    fixedModeSection
      .add(this.mode, 'symbol', symbols)
      .name('Choose symbol')
      .setValue('Seven')
      .onChange((symbol: IMAGE_ASSET) => {
        const mode = this.mode as Fixed;
        mode.reset();
        mode.setSymbol(symbol);
        mode.addBlocks();
      });
    this.gui
      .add(this.mode, 'name', modes)
      .setValue('Random')
      .name('Select mode')
      .onChange((mode: 'Fixed' | 'Random') => {
        fixedModeSection.show(mode === 'Fixed');
        this.setMode(mode);
      });

    this.gui.add(this, 'spin');
  }
}
