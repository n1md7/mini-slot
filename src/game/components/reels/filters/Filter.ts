export abstract class Filter {
  protected constructor() {}

  update(_delta: number, _elapsedMS: number): void {
    return void 0;
  }
}
