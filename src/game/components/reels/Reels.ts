import { AnimationType, Reel } from '/src/game/components/reels/Reel';
import { iSubscribe } from '/src/game/interfaces/subscribe';
import { Application } from 'pixi.js';
import GUI from 'lil-gui';

export class Reels implements iSubscribe {
  private readonly reels: [Reel, Reel, Reel];
  private readonly section: GUI;
  private readonly app: Application;
  private readonly animations = [
    'back.out(0.5)',
    'bounce.out(0.9)',
    'power1.out(0.7)',
    'power1.inOut(0.4)',
    'expo.out(0.4)',
    'sine.out(0.4)',
    'elastic.out(0.3)',
  ];

  private animation: AnimationType = {
    current: '',
  };

  constructor(gui: GUI, app: Application) {
    this.app = app;
    this.section = gui.addFolder('Reels');
    // First one is selected by default
    this.animation.current = this.animations[0];
    this.reels = [
      new Reel({ spinTime: '1.0 sec', id: 0 }, this.section, this.animation),
      new Reel({ spinTime: '1.4 sec', id: 1 }, this.section, this.animation),
      new Reel({ spinTime: '1.8 sec', id: 2 }, this.section, this.animation),
    ];
  }

  subscribe() {
    this.section
      .addFolder('Animation functions')
      .add(this.animations, '', this.animations)
      .name('Choose fn')
      .setValue(this.animation.current)
      .onChange((fn: string) => {
        this.animation.current = fn;
      });

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
