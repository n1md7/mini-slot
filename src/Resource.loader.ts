import { Extension } from './Extension';

enum ImageExt {
  PNG = 'png',
  JPG = 'jpg',
}

enum AudioExt {
  MP3 = 'mp3'
}

type Callback = (errors: Error[], image: Map<string, HTMLImageElement>, voice: Map<string, HTMLAudioElement>) => void;

export class Loader {
  private static readonly imageAllowedExtensions: ImageExt[] = [ImageExt.PNG, ImageExt.JPG];
  private static readonly audioAllowedExtensions: AudioExt[] = [AudioExt.MP3];

  private readonly callbacks: Callback[] = [];
  private readonly errors: Error[] = [];

  private readonly imageResources: string[] = [];
  private readonly audioResources: string[] = [];

  private readonly images: Map<string, HTMLImageElement> = new Map();
  private readonly audios: Map<string, HTMLAudioElement> = new Map();

  public onDone(callback: Callback): void {
    this.callbacks.push(callback);
    this.start().finally(() => console.timeEnd('Resource loading finished in'));
  }

  private start(): Promise<void> {
    console.time('Resource loading finished in');

    return Promise.all([
      Promise.all(this.imageResources.map(Loader.loadImage)),
      Promise.all(this.audioResources.map(Loader.loadAudio)),
    ]).then(([images, audios]) => {
      for (const [resource, image] of images) this.images.set(resource, image);
      for (const [resource, audio] of audios) this.audios.set(resource, audio);
    }).then(() => {
      for (const callback of this.callbacks) callback(this.errors, this.images, this.audios);
    });
  }

  private static loadImage(resource: string): Promise<[string, HTMLImageElement]> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = resource;
      image.addEventListener('load', () => resolve([resource, image]));
      image.addEventListener('error', ({ message }) => reject(message));
    });
  }

  private static loadAudio(resource: string): Promise<[string, HTMLAudioElement]> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(resource);
      audio.addEventListener('canplaythrough', () => resolve([resource, audio]));
      audio.addEventListener('error', ({ message }) => reject(message));
    });
  }

  public addImage(resource: string): void {
    const extension = Extension.extract<ImageExt>(resource);

    if (!Loader.imageAllowedExtensions.includes(extension)) {
      const error = new Error(`Image type [${extension}] not allowed to load!`);
      this.errors.push(error);

      return void 0;
    }

    this.imageResources.push(resource);
  }

  public addImages(images: string[]): void {
    for (const image of images) this.addImage(image);
  }

  public addSound(resource: string): void {
    const extension = Extension.extract<AudioExt>(resource);

    if (!Loader.audioAllowedExtensions.includes(extension)) {
      const error = new Error(`Audio type [${extension}] not allowed to load!`);
      this.errors.push(error);

      return void 0;
    }

    this.audioResources.push(resource);
  }

  public addSounds(voices: string[]): void {
    for (const voice of voices) this.addSound(voice);
  }
}
