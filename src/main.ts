import './style.css';

import { Loader } from './utils/Resource.loader';

import BARx1 from '../images/1xBAR.png';
import BARx2 from '../images/2xBAR.png';
import BARx3 from '../images/3xBAR.png';
import Seven from '../images/7.png';
import Cherry from '../images/Cherry.png';

import WinSound from '../sounds/win.mp3';
import SpinSound from '../sounds/spin.mp3';

import { Slot } from './game/Slot';

const Canvas = {
  width: 420,
  height: 240,
};

const canvas = document.getElementById('slot') as HTMLCanvasElement;
canvas.width = Canvas.width;
canvas.height = Canvas.height;
const context = canvas.getContext('2d')!;

const resourceLoader = new Loader()
  .addImages(BARx1, BARx2, BARx3, Seven, Cherry)
  .addAudios(WinSound, SpinSound)
  .onProgress((progress, loaded, total) => {
    console.log({ progress, loaded, total });
  })
  .startLoading()
  .then(({ images, audios }) => {
    const slot = new Slot(context, {
      height: canvas.height,
      width: canvas.width,
      image: {
        BARx1: images.get(BARx1)!,
        BARx2: images.get(BARx2)!,
        BARx3: images.get(BARx3)!,
        Seven: images.get(Seven)!,
        Cherry: images.get(Cherry)!,
      },
      audio: {
        Win: audios.get(WinSound)!,
        Spin: audios.get(SpinSound)!,
      },
    }).setup();

    (function update(now) {
      if (slot.timeToTick(now)) {
        slot.updateTimestamp(now);
        slot.loop(now);
      }

      window.requestAnimationFrame(update);
    })(0);
  })
  .catch(({ message = 'unknown error' }) => {
    console.error(message);
  });
