import { AUDIO_ASSET, IMAGE_ASSET } from '/src/game/enums';
import { Sound } from '/src/sound/Sound';

const images = {} as Record<IMAGE_ASSET, HTMLImageElement>;
const audios = {} as Record<AUDIO_ASSET, Sound>;

export const assets = {
  images,
  audios,
};
