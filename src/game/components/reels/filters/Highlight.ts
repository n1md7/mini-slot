import * as Filters from 'pixi-filters';
import { Filter } from '/src/game/components/reels/filters/Filter';

export class Highlight extends Filter {
  private readonly _filter: Filters.GlowFilter;
  private readonly _high = 5;
  private readonly _low = 1;
  private _sign = 1;

  constructor() {
    super();

    this._filter = new Filters.GlowFilter({
      outerStrength: 0,
      distance: 10,
      innerStrength: 0,
    });
  }

  get filter() {
    return this._filter;
  }

  override update(_delta: number, _elapsedMS: number) {
    const value = this._filter.outerStrength + this._sign * _delta * 0.1;

    if (value > this._high) this._sign = -1;
    if (value < this._low) this._sign = 1;

    this._filter.outerStrength = value;
  }
}
