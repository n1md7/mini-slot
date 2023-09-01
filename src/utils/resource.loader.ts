import { Extension } from '/src/utils/Extension';

export type ProgressCallback = (data: { progress: number; loaded: number; total: number; done: boolean }) => void;

export class Loader {
  private readonly errors: NonNullable<Error[]> = [];

  private readonly imageResources: NonNullable<string[]> = [];
  private readonly audioResources: NonNullable<string[]> = [];

  private readonly images: Map<string, HTMLImageElement> = new Map();
  private readonly audios: Map<string, HTMLAudioElement> = new Map();
  private counter = 0;

  private get total(): number {
    return this.imageResources.length + this.audioResources.length;
  }

  private get progress(): number {
    return (this.counter / this.total) * 100;
  }

  private get done(): boolean {
    return this.progress === 100;
  }

  private get loaded(): number {
    return this.counter;
  }

  public onProgress(callback: ProgressCallback): this {
    this.callback = callback;

    return this;
  }

  public startLoading() {
    console.time('Resource loading finished in');

    if (this.errors.length) return Promise.reject(this.errors.pop());
    console.log('Started');

    return Promise.all([
      Promise.all(this.imageResources.map(this.loadImage.bind(this))),
      Promise.all(this.audioResources.map(this.loadAudio.bind(this))),
    ])
      .then(([images, audios]) => {
        for (const [resource, image] of images) this.images.set(resource, image);
        for (const [resource, audio] of audios) this.audios.set(resource, audio);
      })
      .then(() => console.timeEnd('Resource loading finished in'))
      .then(() => Promise.resolve({ images: this.images, audios: this.audios }));
  }

  public addImage(resource: string): void {
    const error = Extension.imageFileVerify(resource);

    if (error) {
      this.errors.push(error);

      return void 0;
    }

    this.imageResources.push(resource);
  }

  public addImages(...images: string[]): this {
    for (const image of images) this.addImage(image);

    return this;
  }

  public addAudio(resource: string): void {
    const error = Extension.audioFileVerify(resource);

    if (error) {
      this.errors.push(error);

      return void 0;
    }

    this.audioResources.push(resource);
  }

  public addAudios(...voices: string[]): this {
    for (const voice of voices) this.addAudio(voice);

    return this;
  }

  private callback: ProgressCallback = () => void 0;

  private loadImage(resource: string): Promise<[string, HTMLImageElement]> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = resource;
      image.addEventListener('load', () => {
        this.counter++;
        this.callback({
          total: this.total,
          loaded: this.loaded,
          progress: this.progress,
          done: this.done,
        });
        resolve([resource, image]);
      });
      image.addEventListener('error', () => reject(new Error(`Resource [${resource}] was not able to load!`)));
    });
  }

  private loadAudio(resource: string): Promise<[string, HTMLAudioElement]> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(resource);
      const callback = () => {
        this.counter++;
        this.callback({
          total: this.total,
          loaded: this.loaded,
          progress: this.progress,
          done: this.done,
        });
        resolve([resource, audio]);
      };
      audio.addEventListener('canplaythrough', callback);
      audio.load();
      resolve([resource, audio]);
      audio.addEventListener('error', () => reject(new Error(`Resource [${resource}] was not able to load!`)));
    });
  }
}
