import { Loader as OriginalLoader } from '/src/utils/resource.loader';

export class Loader {
  private static loader = new OriginalLoader();

  static addAudios(audios: string[]) {
    Loader.loader.addAudios(...audios);
  }

  static loadAudios(_placeholder: string, onProgress?: (progress: number) => void) {
    if (typeof onProgress === 'function') {
      Loader.loader.onProgress(({ progress }) => {
        onProgress(progress / 100);
      });
    }

    return Loader.loader.startLoading().then(({ audios }) => audios);
  }
}
