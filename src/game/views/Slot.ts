import { View } from '/src/game/views/View';
import { Application, Container } from 'pixi.js';
import { Point } from '/src/game/components/reels/components/Point';
import { BLOCK, CANVAS, IMAGE_ASSET, REEL } from '/src/game/enums';
import { Reels } from '/src/game/components/reels/Reels';
import { Modes } from '/src/game/strategy/Modes';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { bet, subCredit } from '/src/ui/store';
import GUI from 'lil-gui';

export class Slot extends View {
  private readonly _container: Container;
  private readonly _reels: Reels;
  private readonly _modes: Modes;
  private readonly _section: GUI;

  constructor(section: GUI, app: Application, symbols: Symbols) {
    super(section, app);

    this._section = section;

    this._container = new Container();
    this._container.width = CANVAS.WIDTH;
    this._container.height = CANVAS.HEIGHT;

    this._reels = new Reels(section, this.app);
    this._modes = new Modes(section, this._reels, symbols);

    this.ticker = this.ticker.bind(this);
  }

  async init(): Promise<void> {
    this._container.addChild(...this.stoppingDots());
    this.app.stage.addChild(this._container);
    this._reels.init();
    this.attachGui();
  }

  async run(): Promise<number> {
    subCredit(bet()); // Pay for spin

    await this._modes.current.spin();

    return this._modes.current.calculatePayout();
  }

  subscribe(): void {
    this._container.visible = true;
    this._reels.subscribe();
    this._modes.subscribe();
    this.app.ticker.add(this.ticker);
  }

  unsubscribe(): void {
    this._container.visible = false;
    this._reels.unsubscribe();
    this._modes.unsubscribe();
    this.app.ticker.remove(this.ticker);
  }

  private ticker(_delta: number) {
    this._reels.update(_delta, this.app.ticker.elapsedMS / 1000);
  }

  private stoppingDots() {
    return [
      new Point(0, BLOCK.HEIGHT / 2),
      new Point(0, REEL.HEIGHT / 2),
      new Point(0, REEL.HEIGHT - BLOCK.HEIGHT / 2),

      new Point(CANVAS.WIDTH - Point.width, BLOCK.HEIGHT / 2),
      new Point(CANVAS.WIDTH - Point.width, REEL.HEIGHT / 2),
      new Point(CANVAS.WIDTH - Point.width, REEL.HEIGHT - BLOCK.HEIGHT / 2),
    ];
  }

  private attachGui() {
    this._section
      .add(this._modes, 'name', ['Random', 'Fixed'])
      .setValue('Random')
      .name('Select mode')
      .onChange((mode: 'Fixed' | 'Random') => {
        this._modes.changeTo(mode);
        if (this._modes.isFixed()) {
          // Set default values for Fixed mode
          this._modes.current.setPosition('Middle');
          this._modes.current.setSymbol(IMAGE_ASSET.SEVEN);
        }
      });
  }
}
