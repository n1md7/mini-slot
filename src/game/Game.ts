import { Setup } from '/src/game/Setup';
import { gui } from '/src/utils/gui';
import GUI from 'lil-gui';
import { Views } from '/src/game/views/Views';
import * as store from '/src/ui/store';
import { delay } from '/src/utils/utils';
import env from '/src/utils/Env';
import { assets } from '/src/utils/assets';

export class Game extends Setup {
  private static instance: Game;

  private readonly views: Views;
  private readonly section: GUI;

  private interacted = false;
  private spinning = false;

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

  public showDefaultView(): void {
    this.views.activateDefault();
  }

  public subscribeControls(
    spin: HTMLButtonElement,
    takeWin: HTMLButtonElement,
    doubleWin: HTMLButtonElement,
    autoSpin: HTMLButtonElement,
  ): void {
    spin.addEventListener('click', this.spin.bind(this));
    takeWin.addEventListener('click', this.takeWin.bind(this));
    doubleWin.addEventListener('click', this.doubleWin.bind(this));
    autoSpin.addEventListener('click', this.autoSpin.bind(this));
  }

  public unsubscribeControls(
    spin: HTMLButtonElement,
    takeWin: HTMLButtonElement,
    doubleWin: HTMLButtonElement,
    autoSpin: HTMLButtonElement,
  ): void {
    spin.removeEventListener('click', this.spin.bind(this));
    takeWin.removeEventListener('click', this.takeWin.bind(this));
    doubleWin.removeEventListener('click', this.doubleWin.bind(this));
    autoSpin.removeEventListener('click', this.autoSpin.bind(this));
  }

  private async spin() {
    if (this.spinning) return;
    if (!this.interacted) {
      await assets.audios.BACKGROUND_MUSIC.play();
      this.interacted = true;
    }
    // When user clicks spin, we need to check if he has enough credits
    // If he does, we can spin the reels
    // If he doesn't, we need to show him a message to add more credits by watching an ad
    if (store.credit() < store.bet()) {
      store.showGetMoreCredits();
      store.setAutoSpin(false);
      return;
    }

    // If there is a previous win, we need to add it to the credits (auto take win)
    await this.takeWin();

    this.spinning = true;
    const win = await this.views.current.run();
    this.spinning = false;

    if (win > 0) {
      await assets.audios.WIN_ALERT.play();
      // Celebrate the win
      if (env.isCrazyGames() && win >= 64) await window.CrazyGames.SDK.game.happytime();
      console.log(`You won ${win} coins!`);
      // Hold it temporarily and update the UI
      // User can take it or double it
      store.setWin(win);
    }

    // When auto-spin is enabled, we need to spin again
    if (store.autoSpin()) {
      // Make sure user sees the win
      win > 0 && (await delay(3000));
      // Spin again if the status is still auto-spin
      store.autoSpin() && (await this.spin());
    }
  }

  private async takeWin() {
    // Play audio if there is a win to take
    if (store.win() > 0) await assets.audios.COIN_WIN.play();
    store.addCredit(store.win());
    store.resetWin();
    if (this.views.isDouble()) {
      this.views.activateDefault();
      store.setSlotView();
    }
  }

  private doubleWin() {
    this.views.changeTo('Double');
    store.setAutoSpin(false);
    store.setDoubleView();
  }
  private autoSpin() {
    store.toggleAutoSpin();
  }

  private subscribe() {
    this.views.subscribe();
    this.views.activateDefault();

    this.section.add(this, 'spin').name('Spin');
  }
}
