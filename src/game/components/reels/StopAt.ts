import { Position } from '/src/game/strategy/Fixed';

export type StopType = 'Partial block' | 'Full block';

export class StopAt {
  constructor(value: StopType = 'Full block') {
    this._value = value;
  }

  private _value: StopType;

  get value(): StopType {
    return this._value;
  }

  partial() {
    this._value = 'Partial block';
  }

  full() {
    this._value = 'Full block';
  }

  isPartial() {
    return this._value === 'Partial block';
  }

  isFull() {
    return this._value === 'Full block';
  }

  /**
   * Choose randomly between partial and full
   */
  chooseRandomly() {
    if (Math.random() > 0.5) return this.partial();

    return this.full();
  }

  byPosition(position: Position) {
    if (position === 'Middle') return this.partial();

    return this.full();
  }

  equals(stopAt: StopAt) {
    return this.value === stopAt.value;
  }
}
