import { SlotSound } from './slot-sound';
import { describe, it, expect, vi } from 'vitest';
import { assets } from '/src/utils/assets';

describe('SlotSound', () => {
  describe('playSpin', () => {
    it('should play with default volume', () => {
      const winAudioMock = vi.spyOn(assets.audios.WIN, 'play');
      const spinAudioMock = vi.spyOn(assets.audios.SPIN, 'play');
      const sound = new SlotSound();
      sound.playSpin();

      expect(winAudioMock).not.toHaveBeenCalled();
      expect(spinAudioMock).toHaveBeenCalled();
    });

    it('should play with specified volume', () => {
      const sound = new SlotSound();
      sound.playSpin(0.57);

      expect(assets.audios.SPIN.volume).toBeCloseTo(0.57);
    });
  });
});
