import './style.css';

import { Loader } from './Resource.loader';

import BARx1 from '../images/1xBAR.png';
import BARx2 from '../images/2xBAR.png';
import BARx3 from '../images/3xBAR.png';
import Seven from '../images/7.png';
import Cherry from '../images/Cherry.png';

import WinSound from '../sounds/win.mp3';
import SpinSound from '../sounds/spin.mp3';

import { Reel } from './Reel';

import type { CanvasOptions } from './Canvas';


const canvas = document.getElementById('slot') as HTMLCanvasElement;
canvas.width = 420 + 20;
canvas.height = 240;
const context = canvas.getContext('2d')!;

const resourceLoader = new Loader();
resourceLoader.addImages([BARx1, BARx2, BARx3, Seven, Cherry]);
resourceLoader.addSounds([WinSound, SpinSound]);
resourceLoader.onDone((errors, images, audios) => {
  errors.forEach(({ message }) => console.error(message));
  console.log(images, audios);
  console.log(images.get(BARx3));

  const options: CanvasOptions = {
    reel: {
      height: 240,
      width: 140,
    },
    margin: 10,
    offsetX: 0
  };

  const reel01 = new Reel(context, {...options, offsetX: 0});
  const reel02 = new Reel(context, {...options, offsetX: 1});
  const reel03 = new Reel(context, {...options, offsetX: 2});

  reel01.drawImage(images.get(BARx1)!, 0);
  reel01.drawImage(images.get(Seven)!, 120);
  reel02.drawImage(images.get(BARx2)!, 0);
  reel02.drawImage(images.get(Cherry)!, 120);
  reel03.drawImage(images.get(BARx3)!, 0);
  reel03.drawImage(images.get(BARx1)!, 120);
});