import { Setup } from '/src/game/Setup';
import { Fixed } from '/src/game/strategy/Fixed';
import { gui } from '/src/utils/gui';
import { Reels } from '/src/game/components/reels/Reels';
import { IMAGE_ASSET } from '/src/game/enums';
import { Modes } from '/src/game/strategy/Modes';
import GUI from 'lil-gui';

export class Game extends Setup {
  private static instance: Game;

  private readonly reels: Reels;
  private readonly modes: Modes;
  private readonly section: GUI;

  private constructor() {
    super();

    this.createPixiApplication();
    this.renderSpinner();

    this.section = gui.addFolder('Game options');
    this.reels = new Reels(this.section, this.app);
    this.modes = new Modes(this.reels, this.slotSymbols, this.section);
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
    this.drawStoppingLines();
    this.subscribe();
  }

  public attachControls(spin: HTMLButtonElement): void {
    spin.addEventListener('click', this.spin.bind(this));
  }

  private async spin() {
    await this.modes.current.spin();
    const win = this.modes.current.calculatePayout();
    if (win > 0) {
      console.log(`You won ${win} coins!`);
    }
  }

  private subscribe() {
    this.reels.subscribe();
    this.modes.subscribe();

    this.app.ticker.add((_delta: number) => this.reels.update(_delta, this.app.ticker.elapsedMS / 1000));

    this.section
      .add(this.modes, 'name', ['Random', 'Fixed'])
      .setValue('Random')
      .name('Select mode')
      .onChange((mode: 'Fixed' | 'Random') => {
        this.modes.changeTo(mode);
        if (this.modes.isFixed()) {
          // Set default values for Fixed mode
          this.modes.current.setPosition('Middle');
          this.modes.current.setSymbol(IMAGE_ASSET.SEVEN);
        }
      });

    this.section.add(this, 'spin').name('Spin');
  }
}
