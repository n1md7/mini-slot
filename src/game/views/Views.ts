import { View } from '/src/game/views/View';
import { Application } from 'pixi.js';
import GUI from 'lil-gui';
import { Slot } from '/src/game/views/Slot';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { Double } from '/src/game/views/Double';
import { ViewType } from '/src/game/types';
import config from '/src/utils/Config';
import * as store from '/src/ui/store';

export class Views {
  private readonly views: Record<ViewType, View>;

  private readonly section: GUI;
  private readonly game: GUI;
  private readonly double: GUI;
  private view: View;

  constructor(section: GUI, app: Application, symbols: Symbols) {
    this.section = section.addFolder('Views');
    this.game = this.section.addFolder('Slot');
    this.double = this.section.addFolder('Double');
    this.views = {
      Slot: new Slot(this.game, app, symbols),
      Double: new Double(this.double, app, symbols),
    };
    this.view = this.views.Slot;
  }

  get current() {
    return this.view;
  }

  init() {
    this.views.Slot.init();
    this.views.Double.init();
  }

  isSlot(): this is { current: Slot } {
    return this.view instanceof Slot;
  }

  isDouble(): this is { current: Double } {
    return this.view instanceof Double;
  }

  changeTo(view: ViewType) {
    this.unsubscribeAll();
    this.hideAll();
    this.view = this.views[view];
    this.view.subscribe();
    this.showCurrentGui();
    store.setView({
      isSlot: this.isSlot(),
      isDouble: this.isDouble(),
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
    this.views.Slot.unsubscribe();
    this.views.Double.unsubscribe();
  }

  private hideAll() {
    this.game.hide();
    this.double.hide();
  }

  private showCurrentGui() {
    if (this.isSlot()) this.game.show();
    if (this.isDouble()) this.double.show();
  }
}
