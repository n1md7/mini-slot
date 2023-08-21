import { Symbols } from '/src/game/components/reels/components/Symbols';
import { View } from '/src/game/views/View';
import { Application } from 'pixi.js';
import GUI from 'lil-gui';

export class Bonus extends View {
  constructor(section: GUI, app: Application, _symbols: Symbols) {
    super(section, app);
  }

  init(): void {}

  async run(): Promise<number> {
    console.info('Bonus run');
    return 0;
  }

  subscribe(): void {}

  unsubscribe(): void {}
}
