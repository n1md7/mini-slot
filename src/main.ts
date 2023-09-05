import BARx1 from '/images/symbols/1xBAR.png';
import BARx2 from '/images/symbols/2xBAR.png';
import BARx3 from '/images/symbols/3xBAR.png';
import Seven from '/images/symbols/Seven.png';
import Cherry from '/images/symbols/Cherry.png';
import Background from '/backgrounds/background-01.jpg';

import WinSound from '/sounds/win.mp3';
import SpinSound from '/sounds/spin.mp3';

import { Assets } from '@pixi/assets';
import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

import { BUNDLE, IMAGE_ASSET } from '/src/game/enums';
import { Game } from '/src/game/Game';
import { Loader } from '/src/sound/loader';
import { assets } from '/src/utils/assets';

window.CrazyGames.SDK.game
  .sdkGameLoadingStart()
  .then(() => console.info('CrazyGames SDK loading started'))
  .catch((error) => {
    console.error(`Error while loading CrazyGames SDK: ${error}`);
  });

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

PIXI.settings.ROUND_PIXELS = true;

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
  [IMAGE_ASSET.BACKGROUND]: Background,
});

const assetBundles = [
  Assets.loadBundle(BUNDLE.IMAGES, progress.setImage.bind(progress)),
  Loader.loadAudios(BUNDLE.AUDIOS, progress.setAudio.bind(progress)),
];

Promise.all(assetBundles)
  .then(([images, audios]) => {
    assets.images = images;
    assets.audios = audios;
    document.body.style.backgroundImage = `url(${Background})`;
    game.setup();
  })
  .then(() => window.CrazyGames.SDK.game.sdkGameLoadingStop())
  .then(() => game.start())
  .then(() => window.CrazyGames.SDK.game.gameplayStart())
  .catch((err) => {
    console.error(err?.message || err);
  });

window.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', ' '].includes(event.key)) event.preventDefault();
});
