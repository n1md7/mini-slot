import { View } from '/src/game/views/View';
import { Application } from 'pixi.js';
import GUI from 'lil-gui';
import { Game } from '/src/game/views/Game';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { Bonus } from '/src/game/views/Bonus';
import { ViewType } from '/src/game/types';
import config from '/src/utils/Config';

export class Views {
  private readonly views: Record<ViewType, View>;

  private readonly section: GUI;
  private readonly game: GUI;
  private readonly bonus: GUI;
  private view: View;

  constructor(section: GUI, app: Application, symbols: Symbols) {
    this.section = section.addFolder('Views');
    this.game = this.section.addFolder('Game');
    this.bonus = this.section.addFolder('Bonus');
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

  isBonus(): this is { current: Game } {
    return this.view instanceof Game;
  }

  changeTo(view: ViewType) {
    this.unsubscribeAll();
    this.view = this.views[view];
    this.view.subscribe();
  }

  activateDefault() {
    this.changeTo(config.getDefaultView());
  }

  unsubscribeAll() {
    this.views.Game.unsubscribe();
    this.views.Bonus.unsubscribe();
  }

  subscribe() {
    this.section
      .add(this.views, 'name', ['Game', 'Bonus'])
      .name('Choose view')
      .setValue('Game')
      .onChange((view: keyof typeof this.views) => {
        this.changeTo(view);
        if (this.isGame()) {
          this.game.show();
          this.bonus.hide();
        } else {
          this.game.hide();
          this.bonus.show();
        }
      });
  }
}
