import { Filter } from '/src/game/components/reels/filters/Filter';
import * as Filters from 'pixi-filters';

export class CRT extends Filter {
  private readonly _filter: Filters.CRTFilter;

  constructor() {
    super();

    this._filter = new Filters.CRTFilter({
      vignettingAlpha: 0.5,
      vignettingBlur: 0.3,
      time: 0,
      seed: 10,
    });
  }

  get filter() {
    return this._filter;
  }

  override update(_delta: number, _elapsedMS: number) {
    this._filter.time += _delta * 0.1;
    this._filter.seed = Math.random() * _delta;
  }
}
