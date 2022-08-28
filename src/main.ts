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

const loader = new Loader();

loader.addImages(BARx1, BARx2, BARx3, Seven, Cherry);
loader.addAudios(WinSound, SpinSound);

loader
  .startLoading()
  .then(({ images, audios }) => {
    const slot = new Slot(context, {
      height: canvas.height,
      width: canvas.width,
      image: {
        BARx1: {
          key: 'BARx1',
          val: images.get(BARx1)!,
        },
        BARx2: {
          key: 'BARx2',
          val: images.get(BARx2)!,
        },
        BARx3: {
          key: 'BARx3',
          val: images.get(BARx3)!,
        },
        Seven: {
          key: 'Seven',
          val: images.get(Seven)!,
        },
        Cherry: {
          key: 'Cherry',
          val: images.get(Cherry)!,
        },
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
