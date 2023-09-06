import { AbstractSound } from './sound.abstract';
import { assets } from '/src/utils/assets';
import { sound } from '/src/ui/store';

export class SlotSound extends AbstractSound {
  private winSound!: HTMLAudioElement;
  private spinSound!: HTMLAudioElement;

  constructor() {
    super('SLOT-SOUND');
  }

  init() {
    this.winSound = assets.audios.WIN;
    this.spinSound = assets.audios.SPIN;
  }

  playSpin(volume?: number) {
    this.spinSound.volume = volume ?? sound() * 0.01;
    this.spinSound.muted = this.isDisabled();
    this.spinSound.play().then();

    return this.spinSound;
  }

  playWin(volume?: number) {
    this.winSound.volume = volume ?? sound() * 0.01;
    this.winSound.muted = this.isDisabled();
    this.winSound.play().then();

    return this.winSound;
  }
}
