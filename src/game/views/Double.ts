import { Symbols } from '/src/game/components/reels/components/Symbols';
import { View } from '/src/game/views/View';
import type { Application } from 'pixi.js';
import GUI from 'lil-gui';
import * as PIXI from 'pixi.js';
import * as store from '/src/ui/store';
import { BLOCK, CANVAS, DOUBLE } from '/src/game/enums';
import { Timestamp } from '/src/game/utils/Timestamp';
import { doubleEmitter } from '/src/utils/Emitter';

export class Double extends View {
  private readonly container = new PIXI.Container();
  private readonly red = new PIXI.Graphics();
  private readonly blue = new PIXI.Graphics();
  private readonly timestamp = new Timestamp();

  private level = 1;
  private currentlyVisible: DOUBLE = DOUBLE.BLUE;

  constructor(section: GUI, app: Application, _symbols: Symbols) {
    super(section, app);

    this.ticker = this.ticker.bind(this);
    this.reset = this.reset.bind(this);
    this.onPress = this.onPress.bind(this);

    this.drawShape(this.red, 'red', 0xff0000);
    this.drawShape(this.blue, 'blue', 0x0000ff);
  }

  private get delay() {
    return 1000 / this.level;
  }

  init(): void {
    const text = new PIXI.Text('What color is the shape?', {
      fill: 'white',
      fontFamily: 'Lobster',
      fontWeight: 'bold',
      fontSize: 18,
    });
    text.anchor.set(0.5);
    text.y = 20;
    text.x = CANVAS.WIDTH / 2;

    this.container.addChild(text);
    this.app.stage.addChild(this.container);

    this.container.addChild(this.red, this.blue);

    this.addGui();
    this.reset();
  }

  async run(): Promise<number> {
    // Not used
    return 0;
  }

  subscribe(): void {
    this.container.visible = true;
    this.app.ticker.add(this.ticker, this);
    doubleEmitter.on('onPress', this.onPress);
  }

  unsubscribe(): void {
    this.container.visible = false;
    this.app.ticker.remove(this.ticker, this);
    doubleEmitter.off('onPress', this.onPress);
    this.reset();
  }

  private drawShape(shape: PIXI.Graphics, name: string, color: number) {
    shape.name = name;
    shape.beginFill(color);
    shape.alpha = 0.7;
    shape.lineStyle(2, 0xffffff);
    shape.drawRoundedRect(CANVAS.WIDTH / 2 - BLOCK.WIDTH / 2, 40, BLOCK.WIDTH, BLOCK.WIDTH, 5);
    shape.endFill();
  }

  private reset() {
    this.level = 1;
    this.currentlyVisible = DOUBLE.BLUE;
    this.red.visible = false;
    this.blue.visible = true;
  }

  private toggleShape() {
    this.currentlyVisible = this.currentlyVisible === DOUBLE.BLUE ? DOUBLE.RED : DOUBLE.BLUE;
    this.red.visible = this.currentlyVisible === DOUBLE.RED;
    this.blue.visible = this.currentlyVisible === DOUBLE.BLUE;
  }

  private ticker(_delta: number) {
    if (this.timestamp.delta < this.delay) return;

    this.toggleShape();
    this.timestamp.update();
  }

  private onPress(pressed: DOUBLE) {
    if (pressed === this.currentlyVisible) return this.processWin();

    this.processLose();
  }

  private processWin() {
    this.level++;
    store.doubleWin();
  }

  private processLose() {
    store.resetWin();
  }

  private addGui() {
    this.gui.add(this, 'level', 1, 10, 1).name('Level');
  }
}
