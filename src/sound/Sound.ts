import { isMuted, sound } from '/src/ui/store';

export class Sound {
  private readonly _sound: HTMLAudioElement;
  private readonly _startAt: number;
  private readonly _endAt: number;
  private readonly _volume: number;

  /**
   * @param {string} src - path to sound file
   * @param {number} startAt - in seconds, depends on sound length
   * @param {number} endAt - in seconds, depends on sound length, must be greater than {@link startAt}
   * @param {number} maxVolume - in percent (0 - 100)
   */
  constructor(src: string, startAt: number, endAt: number, maxVolume: number) {
    this._sound = new Audio(src);
    this._startAt = startAt;
    this._endAt = endAt;
    this._volume = maxVolume;
  }

  public async play() {
    this._sound.currentTime = this._startAt;
    this._sound.volume = this.calculatedVolume();

    await this._sound.play().catch(console.error);

    const delta = this._endAt - this._startAt;
    const stopAfter = delta * 1000;
    setTimeout(() => this.stop(), stopAfter);
  }

  public stop() {
    this._sound.pause();
    this._sound.currentTime = this._startAt;
  }

  /**
   * @description - max volume is set by default and the rest is calculated based on global sound volume.
   *
   * If max volume is 30% and global sound volume is 50% then calculated volume will be 15%.
   *
   * Resulting 0.15 since volume is set in range 0 - 1.
   * @private
   */
  private calculatedVolume() {
    if (isMuted()) return 0;

    const maxVolume = this._volume * 0.01;
    const soundPercent = sound() * 0.01;

    return maxVolume * soundPercent;
  }
}
