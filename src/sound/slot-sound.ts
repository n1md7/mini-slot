import { AbstractSound } from './sound.abstract';
import { assets } from '/src/utils/assets';

export class SlotSound extends AbstractSound {
  private readonly winSound: HTMLAudioElement;
  private readonly spinSound: HTMLAudioElement;

  constructor() {
    super('SLOT-SOUND');

    this.winSound = assets.audios.WIN;
    this.spinSound = assets.audios.SPIN;
  }

  playSpin(volume?: number) {
    this.spinSound.volume = volume ?? this.volume;
    this.spinSound.muted = this.isDisabled();
    this.spinSound.play().then();

    return this.spinSound;
  }

  playWin(volume?: number) {
    this.winSound.volume = volume ?? this.volume;
    this.winSound.muted = this.isDisabled();
    this.winSound.play().then();

    return this.winSound;
  }
}
