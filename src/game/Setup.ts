import { Spinner } from '/src/game/components/spinner/Spinner';
import { AUDIO_ASSET, CANVAS, IMAGE_ASSET } from '/src/game/enums';
import { Application, Texture } from 'pixi.js';
import { SlotSound } from '/src/sound/slot-sound';
import { Symbols } from '/src/game/components/reels/components/Symbols';

export abstract class Setup {
  protected readonly spinner: Spinner;
  protected app!: Application;
  protected slotSound!: SlotSound;
  protected slotSymbols: Symbols;

  protected constructor() {
    this.slotSymbols = new Symbols();
    this.spinner = new Spinner();
  }

  public attachAudios(audios: Map<AUDIO_ASSET, HTMLAudioElement>) {
    this.slotSound = new SlotSound(audios.get(AUDIO_ASSET.WIN)!, audios.get(AUDIO_ASSET.SPIN)!);
  }

  public attachSymbols(images: Record<IMAGE_ASSET, Texture>) {
    for (const [key, symbol] of Object.entries(images)) {
      this.slotSymbols.set(<IMAGE_ASSET>key, symbol);
    }
  }

  public updateProgress(val: number) {
    this.spinner.updateProgress(val * 100);
  }

  public start(): void {
    if (!this.slotSound) throw new Error("[attachAudios] hasn't been called");
    if (!this.slotSymbols) throw new Error("[attachSymbols] hasn't been called");
  }

  protected hideSpinner(): void {
    this.spinner.destroy();
  }

  protected createPixiApplication(): void {
    const slot = document.getElementById('slot');
    if (!slot) throw new Error('#slot not found in the document');

    this.app = new Application({
      view: slot as HTMLCanvasElement,
      width: CANVAS.WIDTH,
      height: CANVAS.HEIGHT,
      backgroundColor: 0x000,
      resolution: Math.min(window.devicePixelRatio, 2),
      antialias: true,
      hello: false,
    });
  }

  protected renderSpinner() {
    this.app.stage.addChild(this.spinner);
  }
}
