import { AnimationType, Reel } from '/src/game/components/reels/Reel';
import { iSubscribe } from '/src/game/interfaces/subscribe';
import { Application } from 'pixi.js';
import GUI from 'lil-gui';
import { Block } from '/src/game/components/reels/components/Block';
import { iUnsubscribe } from '/src/game/interfaces/unsubscribe';
import { iInit } from '/src/game/interfaces/init';

export class Reels implements iSubscribe, iUnsubscribe, iInit {
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
    // First one is selected by default
    current: this.animations[0],
  };

  constructor(gui: GUI, app: Application) {
    this.app = app;
    this.section = gui.addFolder('Reels');
    this.reels = [
      new Reel({ spinTime: '1.0 sec', id: 0 }, this.section, this.animation),
      new Reel({ spinTime: '1.4 sec', id: 1 }, this.section, this.animation),
      new Reel({ spinTime: '1.8 sec', id: 2 }, this.section, this.animation),
    ];
    this.update = this.update.bind(this);
  }

  init() {
    this.section
      .addFolder('Animation functions')
      .add(this.animations, '', this.animations)
      .name('Choose fn')
      .setValue(this.animation.current)
      .onChange((fn: string) => {
        this.animation.current = fn;
      });

    for (const reel of this.reels) {
      reel.init();
      this.app.stage.addChild(reel);
    }
  }

  subscribe() {
    for (const reel of this.reels) {
      reel.subscribe();
    }
  }

  unsubscribe() {
    for (const reel of this.reels) {
      reel.unsubscribe();
    }
  }

  areRunning() {
    for (const reel of this.reels) {
      if (reel.isSpinning) return true;
    }

    return false;
  }

  stoppedAtSamePosition() {
    const [target] = this.reels;

    return target.stopAtEquals(...this.reels);
  }

  stoppedAtPartialPosition() {
    for (const reel of this.reels) {
      if (!reel.stopAt.isPartial()) return false;
    }

    return true;
  }

  extractLines() {
    const lines: Block[][] = [];

    let idx = -1;
    while (++idx < 3) {
      const line: Block[] = [];
      for (const reel of this.reels) {
        line.push(reel.blocks[reel.blocks.length - 1 - idx]);
      }
      lines.push(line);
    }

    return {
      first: lines[0],
      second: lines[1],
      third: lines[2],
    };
  }

  toArray() {
    return this.reels;
  }

  update(_delta: number, _elapsedMS: number) {
    for (const reel of this.reels) reel.update(_delta, _elapsedMS);
  }

  *[Symbol.iterator]() {
    for (const reel of this.reels) yield reel;
  }
}
