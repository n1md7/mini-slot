import { MockedAudio } from '/tests/unit/__setup__/Audio';
import { Graphics } from '/tests/unit/__setup__/Graphics';
import { vi } from 'vitest';
import * as PIXI from 'pixi.js';

global.Audio = MockedAudio;

vi.doMock('pixi.js', () => ({
  ...PIXI,
  Graphics,
}));

vi.doMock('/src/utils/assets', () => ({
  assets: {
    audios: {
      WIN: new Audio('win'),
      SPIN: new Audio('spin'),
    },
  },
}));
