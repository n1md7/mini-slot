import { isMuted, music } from '/src/ui/store';
import { Sound } from '/src/sound/Sound';

export class Music extends Sound {
  /**
   * @param {string} src - path to sound file
   * @param {number} startAt - in seconds, depends on sound length
   * @param {number} endAt - in seconds, depends on sound length, must be greater than {@link startAt}, when it is zero it means that sound will play to the end
   * @param {number} maxVolume - in percent (0 - 100)
   */
  constructor(src: string, startAt: number, endAt: number, maxVolume: number) {
    super(src, startAt, endAt, maxVolume);
  }

  override async play() {
    this._sound.loop = true;
    return super.play();
  }

  /**
   * @description - max volume is set by default and the rest is calculated based on global sound volume.
   *
   * If max volume is 30% and global sound volume is 50% then calculated volume will be 15%.
   *
   * Resulting 0.15 since volume is set in range 0 - 1.
   * @private
   */
  protected override calculatedVolume() {
    if (isMuted()) return 0;

    const maxVolume = this._volume * 0.01;
    const soundPercent = music() * 0.01;

    return maxVolume * soundPercent;
  }
}
