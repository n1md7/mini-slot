import { iSubscribe } from '/src/game/interfaces/subscribe';
import { iUnsubscribe } from '/src/game/interfaces/unsubscribe';
import { Application } from 'pixi.js';
import GUI from 'lil-gui';

export abstract class View implements iSubscribe, iUnsubscribe {
  protected constructor(
    protected readonly gui: GUI,
    protected readonly app: Application,
  ) {}

  abstract init(): void;

  abstract run(): Promise<number>;

  abstract subscribe(): void;

  abstract unsubscribe(): void;
}
