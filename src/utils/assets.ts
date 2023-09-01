import { AUDIO_ASSET, IMAGE_ASSET } from '/src/game/enums';

const images = {} as Record<IMAGE_ASSET, HTMLImageElement>;
const audios = {} as Record<AUDIO_ASSET, HTMLAudioElement>;
export const assets = {
  images,
  audios,
};
