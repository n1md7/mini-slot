import { Block } from '/src/game/components/reels/components/Block';
import { Position } from '/src/game/strategy/Fixed';

export class Calculator {
  private _value = 0;

  get value() {
    return this._value;
  }

  calculate([block01, block02, block03]: Block[], position: Position): number {
    if (block01.equals(block02, block03)) {
      this._value = this.getValue(block01) + this.getMultiplier(block01, position);
    }

    if (block01.isAnyBAR && block02.isAnyBAR && block03.isAnyBAR) {
      // Any BAR combination only pays 5
      this._value = 5;
    }

    if (block01.isSevenOrCherry && block02.isSevenOrCherry && block03.isSevenOrCherry) {
      // Any 3 Seven or Cherry combination pays 75
      return 75;
    }

    return this._value;
  }

  private getMultiplier(block: Block, position: Position) {
    if (block.isCherry) {
      if (position === 'Top') return 2;
      if (position === 'Middle') return 1;
      if (position === 'Bottom') return 4;
    }

    if (block.isSeven) {
      if (position === 'Top') return 1;
      if (position === 'Middle') return 3;
      if (position === 'Bottom') return 2;
    }

    return 1;
  }

  private getValue(block: Block) {
    if (block.isBARx1) return 10;
    if (block.isBARx2) return 20;
    if (block.isBARx3) return 50;
    if (block.isSeven) return 150;
    if (block.isCherry) return 1000;

    return 0;
  }
}
