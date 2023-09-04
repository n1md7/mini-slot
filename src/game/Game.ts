import { Setup } from '/src/game/Setup';
import { gui } from '/src/utils/gui';
import GUI from 'lil-gui';
import { Views } from '/src/game/views/Views';
import * as store from '/src/ui/store';

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

  public subscribeControls(spin: HTMLButtonElement, takeWin: HTMLButtonElement, doubleWin: HTMLButtonElement): void {
    spin.addEventListener('click', this.spin.bind(this));
    takeWin.addEventListener('click', this.takeWin.bind(this));
    doubleWin.addEventListener('click', this.doubleWin.bind(this));
  }

  public unsubscribeControls(spin: HTMLButtonElement, takeWin: HTMLButtonElement, doubleWin: HTMLButtonElement): void {
    spin.removeEventListener('click', this.spin.bind(this));
    takeWin.removeEventListener('click', this.takeWin.bind(this));
    doubleWin.removeEventListener('click', this.doubleWin.bind(this));
  }

  private async spin() {
    // When user clicks spin, we need to check if he has enough credits
    // If he does, we can spin the reels
    // If he doesn't, we need to show him a message to add more credits by watching an ad
    if (store.credit() < store.bet()) {
      alert('You need more credits to spin the reels!');
    }

    // If there is a previous win, we need to add it to the credits (auto take win)
    this.takeWin();

    return this.views.current.run().then((win) => {
      if (win > 0) {
        console.log(`You won ${win} coins!`);
        // Hold it temporarily and update the UI
        // User can take it or double it
        store.setWin(win);
      }
    });
  }

  private takeWin() {
    store.addCredit(store.win());
    store.resetWin();
    if (this.views.isDouble()) {
      this.views.activateDefault();
    }
  }

  private doubleWin() {
    this.views.changeTo('Double');
  }

  private subscribe() {
    this.views.subscribe();
    this.views.activateDefault();

    this.section.add(this, 'spin').name('Spin');
  }
}
