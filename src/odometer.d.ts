declare module 'odometer' {
  export default class Odometer {
    constructor(options: {
      el: HTMLElement;
      value?: number | string;
      theme?: string;
      format?: string;
      duration?: number;
      animation?: string;
    });
    update(value: number): void;
  }
}
