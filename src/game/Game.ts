import { Setup } from '/src/game/Setup';
import { gui } from '/src/utils/gui';
import GUI from 'lil-gui';
import { Views } from '/src/game/views/Views';
import { updateCredit } from '/src/ui/store';

export class Game extends Setup {
  private static instance: Game;

  private readonly views: Views;
  private readonly section: GUI;

  private constructor() {
    super();

    this.createPixiApplication();
    this.renderSpinner();

    this.section = gui.addFolder('Game options');
    this.views = new Views(this.section, this.app, this.slotSymbols);
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  public start(): void {
    this.hideSpinner();
    this.views.init();
    this.subscribe();
  }

  public attachControls(spin: HTMLButtonElement): void {
    spin.addEventListener('click', this.spin.bind(this));
  }

  private async spin() {
    return this.views.current.run().then((win) => {
      if (win > 0) {
        console.log(`You won ${win} coins!`);
        updateCredit(win);
      }
    });
  }

  private subscribe() {
    this.views.subscribe();
    this.views.activateDefault();

    this.section.add(this, 'spin').name('Spin');
  }
}
