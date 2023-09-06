import { Spinner } from '/src/game/components/spinner/Spinner';
import { CANVAS, IMAGE_ASSET } from '/src/game/enums';
import { Application } from 'pixi.js';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { assets } from '/src/utils/assets';

export abstract class Setup {
  protected readonly spinner: Spinner;
  protected app!: Application;
  protected slotSymbols: Symbols;

  protected constructor() {
    this.spinner = new Spinner();
    this.slotSymbols = new Symbols();
  }

  public updateProgress(val: number) {
    this.spinner.updateProgress(val * 100);
  }

  public setup(): void {
    this.slotSymbols.set(IMAGE_ASSET.BARx1, assets.images.BARx1);
    this.slotSymbols.set(IMAGE_ASSET.BARx2, assets.images.BARx2);
    this.slotSymbols.set(IMAGE_ASSET.BARx3, assets.images.BARx3);
    this.slotSymbols.set(IMAGE_ASSET.SEVEN, assets.images.SEVEN);
    this.slotSymbols.set(IMAGE_ASSET.CHERRY, assets.images.CHERRY);
  }

  abstract start(): void;

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
      backgroundColor: '#041238',
      backgroundAlpha: 0.7,
      resolution: 1,
      antialias: true,
      hello: false,
    });
  }

  protected renderSpinner() {
    this.app.stage.addChild(this.spinner);
  }
}
