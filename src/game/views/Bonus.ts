import { Symbols } from '/src/game/components/reels/components/Symbols';
import { View } from '/src/game/views/View';
import { Application } from 'pixi.js';
import GUI from 'lil-gui';
import * as PIXI from 'pixi.js';

export class Bonus extends View {
  private target = new PIXI.Point();
  private mask = new PIXI.Sprite();
  private container = new PIXI.Container();

  constructor(section: GUI, app: Application, _symbols: Symbols) {
    super(section, app);

    this.ticker = this.ticker.bind(this);
    this.reset = this.reset.bind(this);
  }

  init(): void {
    const bg = PIXI.Sprite.from('https://pixijs.com/assets/bg_plane.jpg');
    this.container.addChild(bg);
    const cells = PIXI.Sprite.from('https://pixijs.com/assets/cells.png');
    cells.scale.set(1.5);

    this.mask = PIXI.Sprite.from('https://pixijs.com/assets/flowerTop.png');
    this.mask.anchor.set(0.5);
    this.mask.x = 310;
    this.mask.y = 190;

    cells.mask = this.mask;

    this.container.addChild(this.mask, cells);
    this.app.stage.addChild(this.container);
  }

  async run(): Promise<number> {
    console.info('Bonus run');
    return 0;
  }

  subscribe(): void {
    this.container.visible = true;
    this.app.ticker.add(this.ticker);
  }

  unsubscribe(): void {
    this.container.visible = false;
    this.app.ticker.remove(this.ticker);
  }

  private reset() {
    this.target.x = Math.floor(Math.random() * 550);
    this.target.y = Math.floor(Math.random() * 300);
  }

  private ticker(_delta: number) {
    this.mask.x += (this.target.x - this.mask.x) * 0.1;
    this.mask.y += (this.target.y - this.mask.y) * 0.1;

    if (Math.abs(this.mask.x - this.target.x) < 1) {
      this.reset();
    }
  }
}
