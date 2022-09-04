import BARx1 from '/images/1xBAR.png';
import BARx2 from '/images/2xBAR.png';
import BARx3 from '/images/3xBAR.png';
import Seven from '/images/Seven.png';
import Cherry from '/images/Cherry.png';

import WinSound from '/sounds/win.mp3';
import SpinSound from '/sounds/spin.mp3';

import { Assets } from '@pixi/assets';
import { settings, Texture, utils } from 'pixi.js';

import { AUDIO_ASSET, BUNDLE, IMAGE_ASSET } from '/src/game/enums';
import { Game } from '/src/game/Game';
import { delay } from '/src/utils/functions';
import { Loader } from '/src/sound/loader';

utils.skipHello();
settings.ROUND_PIXELS = true;

const game = Game.getInstance();

const progress = {
  images: 0,
  audios: 0,
  setImage(val: number): void {
    progress.images = val;
    game.updateProgress(progress.value);
  },
  setAudio(val: number): void {
    progress.audios = val;
    game.updateProgress(progress.value);
  },
  get value(): number {
    return (progress.images + progress.audios) / 2;
  },
};

Loader.addAudios([WinSound, SpinSound]);

Assets.addBundle(BUNDLE.IMAGES, {
  [IMAGE_ASSET.BARx1]: BARx1,
  [IMAGE_ASSET.BARx2]: BARx2,
  [IMAGE_ASSET.BARx3]: BARx3,
  [IMAGE_ASSET.SEVEN]: Seven,
  [IMAGE_ASSET.CHERRY]: Cherry,
});

const assetBundles = [
  Assets.loadBundle(BUNDLE.IMAGES, progress.setImage),
  Loader.loadAudios(BUNDLE.AUDIOS, progress.setAudio),
];

Promise.all(assetBundles)
  .then(([images, audios]) => {
    game.attachAudios(audios as Map<AUDIO_ASSET, HTMLAudioElement>);
    game.attachSymbols(images as Record<IMAGE_ASSET, Texture>);
  })
  .then(() => delay())
  .then(() => game.start())
  .catch((err) => {
    console.error(err?.message || err);
  });
