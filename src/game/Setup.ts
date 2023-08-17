import { Spinner } from '/src/game/components/spinner/Spinner';
import { AUDIO_ASSET, BLOCK, CANVAS, IMAGE_ASSET, REEL } from '/src/game/enums';
import { Application, Texture } from 'pixi.js';
import { Point } from '/src/game/components/reel/components/Point';
import { SlotSound } from '/src/sound/slot-sound';
import { Symbols } from '/src/game/components/reel/components/Symbols';

export abstract class Setup {
  protected readonly spinner = new Spinner();
  protected app!: Application;
  protected slotSound!: SlotSound;
  protected slotSymbols: Symbols;
  protected readonly symbols = [
    IMAGE_ASSET.SEVEN,
    IMAGE_ASSET.CHERRY,
    IMAGE_ASSET.BARx1,
    IMAGE_ASSET.BARx2,
    IMAGE_ASSET.BARx3,
  ];

  protected constructor() {
    this.slotSymbols = new Symbols();
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

  protected drawStoppingLines(): void {
    this.app.stage.addChild(
      new Point(0, BLOCK.HEIGHT / 2),
      new Point(0, REEL.HEIGHT / 2),
      new Point(0, REEL.HEIGHT - BLOCK.HEIGHT / 2),

      new Point(CANVAS.WIDTH - Point.width, BLOCK.HEIGHT / 2),
      new Point(CANVAS.WIDTH - Point.width, REEL.HEIGHT / 2),
      new Point(CANVAS.WIDTH - Point.width, REEL.HEIGHT - BLOCK.HEIGHT / 2),
    );
  }
}
