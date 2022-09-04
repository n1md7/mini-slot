import { AbstractSound } from './sound.abstract';

export class SlotSound extends AbstractSound {
  constructor(private readonly winSound: HTMLAudioElement, private readonly spinSound: HTMLAudioElement) {
    super('SLOT-SOUND');
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
