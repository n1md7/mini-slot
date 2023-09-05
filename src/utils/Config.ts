import { ViewType } from '/src/game/types';

export class Config {
  constructor(private readonly vars: Record<string, string>) {}

  getDefaultView(): ViewType {
    return this.vars['VITE_DEFAULT_VIEW'] as ViewType;
  }

  getAnimationFunction() {
    return this.vars['VITE_ANIMATION_FUNCTION'];
  }

  getAnimationStrength() {
    return this.vars['VITE_ANIMATION_STRENGTH'];
  }

  getDoubleDelay() {
    return +this.vars['VITE_DOUBLE_DELAY'];
  }
}

export default new Config(import.meta.env);
