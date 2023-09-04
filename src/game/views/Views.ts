import { View } from '/src/game/views/View';
import { Application } from 'pixi.js';
import GUI from 'lil-gui';
import { Game } from '/src/game/views/Game';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { Bonus } from '/src/game/views/Bonus';
import { ViewType } from '/src/game/types';
import config from '/src/utils/Config';
import { setView } from '/src/ui/store';

export class Views {
  private readonly views: Record<ViewType, View>;

  private readonly section: GUI;
  private readonly game: GUI;
  private readonly bonus: GUI;
  private readonly confirm: GUI;
  private view: View;

  constructor(section: GUI, app: Application, symbols: Symbols) {
    this.section = section.addFolder('Views');
    this.game = this.section.addFolder('Game');
    this.bonus = this.section.addFolder('Bonus');
    this.confirm = this.section.addFolder('Confirm');
    this.views = {
      Game: new Game(this.game, app, symbols),
      Bonus: new Bonus(this.bonus, app, symbols),
    };
    this.view = this.views.Game;
  }

  get current() {
    return this.view;
  }

  init() {
    this.views.Game.init();
    this.views.Bonus.init();
  }

  isGame(): this is { current: Game } {
    return this.view instanceof Game;
  }

  isBonus(): this is { current: Bonus } {
    return this.view instanceof Bonus;
  }

  changeTo(view: ViewType) {
    this.unsubscribeAll();
    this.hideAll();
    this.view = this.views[view];
    this.view.subscribe();
    this.showCurrentGui();
    setView({
      isGame: this.isGame(),
      isBonus: this.isBonus(),
    });
  }

  activateDefault() {
    this.changeTo(config.getDefaultView());
  }

  subscribe() {
    this.section
      .add(this.views, 'name', Object.keys(this.views))
      .name('Choose view')
      .setValue(config.getDefaultView())
      .onChange((view: ViewType) => {
        this.changeTo(view);
      });
  }

  private unsubscribeAll() {
    this.views.Game.unsubscribe();
    this.views.Bonus.unsubscribe();
  }

  private hideAll() {
    this.game.hide();
    this.bonus.hide();
    this.confirm.hide();
  }

  private showCurrentGui() {
    if (this.isGame()) this.game.show();
    if (this.isBonus()) this.bonus.show();
  }
}
