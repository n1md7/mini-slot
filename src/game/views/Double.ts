import { Symbols } from '/src/game/components/reels/components/Symbols';
import { View } from '/src/game/views/View';
import type { Application } from 'pixi.js';
import GUI from 'lil-gui';
import * as PIXI from 'pixi.js';
import { CANVAS } from '/src/game/enums';

export class Double extends View {
  private container = new PIXI.Container();

  constructor(section: GUI, app: Application, _symbols: Symbols) {
    super(section, app);

    this.ticker = this.ticker.bind(this);
    this.reset = this.reset.bind(this);
  }

  init(): void {
    const text = new PIXI.Text('Bonus level', {
      fill: 'white',
      fontFamily: 'Verdana, Geneva, sans-serif',
      fontVariant: 'small-caps',
      fontWeight: '900',
    });
    text.anchor.set(0.5);
    text.y = CANVAS.HEIGHT / 2;
    text.x = CANVAS.WIDTH / 2;

    this.container.addChild(text);
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

  private reset() {}

  private ticker(_delta: number) {}
}
