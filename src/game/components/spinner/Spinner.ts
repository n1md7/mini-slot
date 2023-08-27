import { Container, Text } from 'pixi.js';
import { CANVAS } from '/src/game/enums';

export class Spinner extends Container {
  private readonly progress: Text;

  constructor() {
    super();

    const loading = new Text('Loading...', {
      fill: 'white',
      fontFamily: 'Verdana, Geneva, sans-serif',
      fontVariant: 'small-caps',
      fontWeight: '900',
    });
    loading.anchor.set(0.5);
    loading.y = CANVAS.HEIGHT / 2;
    loading.x = CANVAS.WIDTH / 2;

    const poweredBy = new Text('Powered by PIXI.JS', {
      fill: 'white',
      fontFamily: 'Verdana, Geneva, sans-serif',
      fontVariant: 'small-caps',
      fontWeight: '100',
      fontSize: 10,
    });

    poweredBy.anchor.set(0.5);
    poweredBy.y = CANVAS.HEIGHT - 16;
    poweredBy.x = CANVAS.WIDTH / 2;

    this.progress = new Text('0.00%', {
      fill: 'white',
      fontFamily: 'Verdana, Geneva, sans-serif',
      fontVariant: 'small-caps',
      fontWeight: '300',
      fontSize: 10,
    });

    this.progress.anchor.set(0.5);
    this.progress.y = CANVAS.HEIGHT - 32;
    this.progress.x = CANVAS.WIDTH / 2;

    this.addChild(loading, poweredBy, this.progress);
  }

  updateProgress(val: number): void {
    this.progress.text = this.toPercent(val);
  }

  private toPercent(val: number): string {
    return val.toFixed(2) + '%';
  }
}
