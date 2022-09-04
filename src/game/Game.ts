import { Application, Texture } from 'pixi.js';
import { AudioAsset, Canvas, ImageAsset } from './enums';
import { Spinner } from './components/spinner/Spinner';
import { SlotSound } from '../sound/SlotSound';
import { Symbols } from './components/reel/components/Symbols';

export class Game {
  private static instance: Game;

  private readonly spinner = new Spinner();

  private slotSound!: SlotSound;
  private slotSymbols!: Symbols;
  private app!: Application;

  private constructor() {
    this.init();
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  public updateProgress(val: number) {
    this.spinner.updateProgress(val * 100);
  }

  public start(): void {
    this.hideSpinner();
    this.loop();
  }

  public attachAudios(audios: Map<AudioAsset, HTMLAudioElement>) {
    this.slotSound = new SlotSound(audios.get(AudioAsset.WIN)!, audios.get(AudioAsset.SPIN)!);
  }

  public attachSymbols(images: Record<ImageAsset, Texture>) {
    this.slotSymbols = new Symbols();
    for (const [key, symbol] of Object.entries(images)) {
      this.slotSymbols.set(<ImageAsset>key, symbol);
    }
  }

  private hideSpinner(): void {
    this.spinner.destroy();
  }

  private init(): void {
    this.createPixiApplication();
    this.renderSpinner();
  }

  private createPixiApplication(): void {
    const slot = document.getElementById('slot');
    if (!slot) throw new Error('#slot not found in the document');

    this.app = new Application({
      view: slot as HTMLCanvasElement,
      width: Canvas.WIDTH,
      height: Canvas.HEIGHT,
      backgroundColor: 0x000,
      resolution: window.devicePixelRatio || 1,
    });
  }

  private renderSpinner() {
    this.app.stage.addChild(this.spinner);
  }

  private loop(): void {
    this.app.ticker.add((_delta) => {
      // TODO: main update logic here
    });
  }
}
