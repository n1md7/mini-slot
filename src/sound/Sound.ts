import { isMuted, sound } from '/src/ui/store';
import { doubleEmitter } from '/src/utils/Emitter';

export class Sound {
  protected readonly _sound: HTMLAudioElement;
  protected readonly _startAt: number;
  protected readonly _endAt: number;
  protected readonly _volume: number;

  /**
   * @param {string} src - path to sound file
   * @param {number} startAt - in seconds, depends on sound length
   * @param {number} endAt - in seconds, depends on sound length, must be greater than {@link startAt}, when it is zero it means that sound will play to the end
   * @param {number} maxVolume - in percent (0 - 100)
   */
  constructor(src: string, startAt: number, endAt: number, maxVolume: number) {
    this._sound = new Audio(src);
    this._startAt = startAt;
    this._endAt = endAt;
    this._volume = maxVolume;

    doubleEmitter.on('volumeChange', this.onVolumeChange.bind(this));
  }

  public async play() {
    this._sound.currentTime = this._startAt;
    this._sound.volume = this.calculatedVolume();

    await this._sound.play().catch(console.error);

    const delta = this._endAt - this._startAt;
    const stopAfter = delta * 1000;

    if (this._endAt === 0) return 0;

    return setTimeout(() => this.stop(), stopAfter);
  }

  public stop() {
    this._sound.pause();
    this._sound.currentTime = this._startAt;
  }

  protected onVolumeChange() {
    this._sound.volume = this.calculatedVolume();
  }

  /**
   * @description - max volume is set by default and the rest is calculated based on global sound volume.
   *
   * If max volume is 30% and global sound volume is 50% then calculated volume will be 15%.
   *
   * Resulting 0.15 since volume is set in range 0 - 1.
   * @private
   */
  protected calculatedVolume() {
    if (isMuted()) return 0;

    const maxVolume = this._volume * 0.01;
    const soundPercent = sound() * 0.01;

    return maxVolume * soundPercent;
  }
}
