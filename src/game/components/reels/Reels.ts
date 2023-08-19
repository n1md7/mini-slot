import GUI from 'lil-gui';
import { Reel } from '/src/game/components/reels/Reel';
import { iSubscribe } from '/src/game/interfaces/subscribe';
import { Application } from 'pixi.js';

export class Reels implements iSubscribe {
  private readonly reels: [Reel, Reel, Reel];
  private readonly section: GUI;
  private readonly app: Application;
  constructor(gui: GUI, app: Application) {
    this.app = app;
    this.section = gui.addFolder('Reels');
    this.reels = [
      new Reel({ spinTime: '1.0 sec', id: 0 }, this.section),
      new Reel({ spinTime: '1.4 sec', id: 1 }, this.section),
      new Reel({ spinTime: '1.8 sec', id: 2 }, this.section),
    ];
  }

  subscribe() {
    for (const reel of this.reels) {
      reel.subscribe();
      this.app.stage.addChild(reel);
    }
  }

  areRunning() {
    for (const reel of this.reels) {
      if (reel.isSpinning) return true;
    }
    return false;
  }

  toArray() {
    return this.reels;
  }

  *[Symbol.iterator]() {
    for (const reel of this.reels) yield reel;
  }
}
