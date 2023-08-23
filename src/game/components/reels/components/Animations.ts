import GUI from 'lil-gui';
import config from '/src/utils/Config';

export class Animations {
  current = config.getAnimationFunction();
  strength = config.getAnimationStrength();

  readonly fns = [
    'back.out',
    'bounce.out',
    'power1.out',
    'power1.in',
    'power1.inOut',
    'power2.out',
    'power2.in',
    'power2.inOut',
    'power3.out',
    'power3.in',
    'power3.inOut',
    'power4.out',
    'power4.in',
    'power4.inOut',
    'expo.out',
    'expo.in',
    'expo.inOut',
    'sine.out',
    'sine.in',
    'sine.inOut',
    'elastic.out',
    'elastic.in',
    'elastic.inOut',
  ];

  private section: GUI;

  constructor(section: GUI) {
    this.section = section.addFolder('Animations');
  }

  init() {
    this.section
      .add(this.fns, '', this.fns)
      .name('Function')
      .setValue(this.current)
      .onChange((fn: string) => {
        this.current = fn;
      });

    this.section.add(this, 'strength', 0, 1, 0.1).name('Strength');
  }

  getCurrentValue() {
    return `${this.current}(${this.strength})`;
  }
}
