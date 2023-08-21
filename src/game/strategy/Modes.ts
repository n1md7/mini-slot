import { Strategy } from '/src/game/strategy/Strategy';
import { Random } from '/src/game/strategy/Random';
import { Fixed } from '/src/game/strategy/Fixed';
import { Reels } from '/src/game/components/reels/Reels';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { iSubscribe } from '/src/game/interfaces/subscribe';
import GUI from 'lil-gui';

export class Modes implements iSubscribe {
  private readonly modes: {
    Random: Strategy;
    Fixed: Strategy;
  };
  private mode: Strategy;

  constructor(gui: GUI, reels: Reels, symbols: Symbols) {
    this.modes = {
      Random: new Random(reels, symbols),
      Fixed: new Fixed(reels, symbols, gui),
    };
    this.mode = this.modes.Random;
  }

  get current() {
    return this.mode;
  }

  isFixed(): this is { current: Fixed } {
    return this.mode instanceof Fixed;
  }

  isRandom(): this is { current: Random } {
    return this.mode instanceof Random;
  }

  changeTo(mode: keyof typeof this.modes) {
    this.mode.hideGui();
    this.mode = this.modes[mode];
    this.mode.showGui();
  }

  subscribe() {
    this.modes.Random.subscribe();
    this.modes.Fixed.subscribe();
  }

  unsubscribe() {
    this.modes.Random.unsubscribe();
    this.modes.Fixed.unsubscribe();
  }
}
