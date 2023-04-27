export class Timestamp {
  private readonly _started!: number;
  private _current!: number;

  constructor() {
    this.update();
    this._started = Date.now();
  }

  get elapsed() {
    return this._current - this._started;
  }

  get delta() {
    return Date.now() - this._current;
  }

  update() {
    this._current = Date.now();
  }
}
