declare module 'odometer' {
  export default class Odometer {
    constructor(options: {
      el: HTMLElement;
      value?: number | string;
      theme?: 'minimal' | 'slot-machine' | 'car' | 'default' | 'plaza' | 'digital' | 'train-station';
      format?: string;
      duration?: number;
      animation?: string;
    });
    update(value: number): void;
  }
}
