import BARx1 from '/images/symbols/1xBAR.png';
import BARx2 from '/images/symbols/2xBAR.png';
import BARx3 from '/images/symbols/3xBAR.png';
import Seven from '/images/symbols/Seven.png';
import Cherry from '/images/symbols/Cherry.png';
import Background from '/backgrounds/background-01.jpg';

import WinSound from '/sounds/win.mp3';
import SpinSound from '/sounds/spin.mp3';
import CoinWinSound from '/sounds/coin-win.wav';
import LoseBeepsSound from '/sounds/lose-beeps.wav';
import ReelSpinSound from '/sounds/reel-spin.wav';
import WinAlertSound from '/sounds/win-alert.wav';
import BackgroundMusic from '/sounds/background-music.mp3';

import { Assets } from '@pixi/assets';
import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

import { BUNDLE, IMAGE_ASSET } from '/src/game/enums';
import { Game } from '/src/game/Game';
import { Loader } from '/src/sound/loader';
import { assets } from '/src/utils/assets';
import env from '/src/utils/Env';
import { Sound } from '/src/sound/Sound';
import { Music } from '/src/sound/Music';

if (env.isCrazyGames()) {
  window.CrazyGames.SDK.game
    .sdkGameLoadingStart()
    .then(() => console.info('CrazyGames SDK loading started'))
    .catch((error) => {
      console.error(`Error while loading CrazyGames SDK: ${error}`);
    });
}

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

Loader.addAudios([WinSound, SpinSound, CoinWinSound, LoseBeepsSound, ReelSpinSound, WinAlertSound, BackgroundMusic]);

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
    assets.audios = {
      WIN: new Sound(audios.get(WinSound)?.src, 0, 3, 30),
      SPIN: new Sound(audios.get(SpinSound)?.src, 0, 3, 30),
      COIN_WIN: new Sound(audios.get(CoinWinSound)?.src, 0, 3, 30),
      LOSE_BEEPS: new Sound(audios.get(LoseBeepsSound)?.src, 0, 3, 30),
      REEL_SPIN: new Sound(audios.get(ReelSpinSound)?.src, 0, 0, 30),
      WIN_ALERT: new Sound(audios.get(WinAlertSound)?.src, 0, 3, 30),
      BACKGROUND_MUSIC: new Music(audios.get(BackgroundMusic)?.src, 0, 0, 5),
    };
    document.body.style.backgroundImage = `url(${Background})`;
    game.setup();
  })
  .then(() => {
    env.isCrazyGames() && window.CrazyGames.SDK.game.sdkGameLoadingStop();
  })
  .then(() => game.start())
  .then(() => {
    env.isCrazyGames() && window.CrazyGames.SDK.game.gameplayStart();
  })
  .catch((err) => {
    console.error(err?.message || err);
  });
