import './style.css';

import BARx1 from '../images/1xBAR.png';
import BARx2 from '../images/2xBAR.png';
import BARx3 from '../images/3xBAR.png';
import Seven from '../images/7.png';
import Cherry from '../images/Cherry.png';

import WinSound from '../sounds/win.mp3';
import SpinSound from '../sounds/spin.mp3';

import { Game } from './game/Game';
import { Assets } from '@pixi/assets';
import { AudioAsset, Bundle, ImageAsset } from './game/enums';
import { settings, Texture, utils } from 'pixi.js';
import { delay } from './utils/functions';
import { Loader } from './utils/Resource.loader';

utils.skipHello();
settings.ROUND_PIXELS = true;

const game = Game.getInstance();
const audioBundle = new Loader().addAudios(WinSound, SpinSound);

Assets.addBundle(Bundle.IMAGES, {
  [ImageAsset.BARx1]: BARx1,
  [ImageAsset.BARx2]: BARx2,
  [ImageAsset.BARx3]: BARx3,
  [ImageAsset.SEVEN]: Seven,
  [ImageAsset.CHERRY]: Cherry,
});

const assetBundles = [Assets.loadBundle(Bundle.IMAGES, game.updateProgress.bind(game)), audioBundle.startLoading()];

Promise.all(assetBundles)
  .then(([images, { audios }]) => {
    game.attachAudios(audios as Map<AudioAsset, HTMLAudioElement>);
    game.attachSymbols(images as Record<ImageAsset, Texture>);
  })
  .then(() => delay())
  .then(() => game.start())
  .catch((err) => {
    console.error(err?.message || err);
  });
