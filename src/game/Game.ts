import { Application, Texture } from 'pixi.js';
import { AUDIO_ASSET, CANVAS, IMAGE_ASSET, REEL } from './enums';
import { Spinner } from './components/spinner/Spinner';
import { SlotSound } from '../sound/slot-sound';
import { Symbols } from './components/reel/components/Symbols';
import { Reel } from '/src/game/components/reel/Reel';
import { Block } from '/src/game/components/reel/components/Block';
import { Random } from '/src/utils/random';

export class Game {
  private static instance: Game;

  private readonly spinner = new Spinner();

  private slotSound!: SlotSound;
  private slotSymbols!: Symbols;
  private slotReels!: [Reel, Reel, Reel];
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
    if (!this.slotSound) throw new Error('[attachAudios] is not called');
    if (!this.slotSymbols) throw new Error('[attachSymbols] is not called');

    this.hideSpinner();
    this.attachReels();
    this.addBlocks();
    this.attachLoop();
  }

  public attachAudios(audios: Map<AUDIO_ASSET, HTMLAudioElement>) {
    this.slotSound = new SlotSound(audios.get(AUDIO_ASSET.WIN)!, audios.get(AUDIO_ASSET.SPIN)!);
  }

  public attachSymbols(images: Record<IMAGE_ASSET, Texture>) {
    this.slotSymbols = new Symbols();
    for (const [key, symbol] of Object.entries(images)) {
      this.slotSymbols.set(<IMAGE_ASSET>key, symbol);
    }
  }

  private attachReels() {
    this.slotReels = [
      new Reel({ spinTime: '2.0 sec', id: 0 }),
      new Reel({ spinTime: '2.4 sec', id: 1 }),
      new Reel({ spinTime: '2.8 sec', id: 2 }),
    ];
    this.app.stage.addChild(...this.slotReels);
  }

  private addBlocks() {
    const [reel01, reel02, reel03] = this.slotReels;

    reel01.addBlocks([
      new Block(this.slotSymbols.get(IMAGE_ASSET.CHERRY)!),
      /*new Block(this.slotSymbols.get(IMAGE_ASSET.SEVEN)!),
      new Block(this.slotSymbols.get(IMAGE_ASSET.BARx1)!),
      new Block(this.slotSymbols.get(IMAGE_ASSET.BARx2)!),
      new Block(this.slotSymbols.get(IMAGE_ASSET.BARx3)!),*/
    ]);
    reel02.addBlocks([
      new Block(this.slotSymbols.get(IMAGE_ASSET.SEVEN)!),
      /*new Block(this.slotSymbols.get(IMAGE_ASSET.BARx1)!),
      new Block(this.slotSymbols.get(IMAGE_ASSET.BARx2)!),
      new Block(this.slotSymbols.get(IMAGE_ASSET.BARx3)!),
      new Block(this.slotSymbols.get(IMAGE_ASSET.CHERRY)!),*/
    ]);
    reel03.addBlocks([
      new Block(this.slotSymbols.get(IMAGE_ASSET.CHERRY)!),
      /* new Block(this.slotSymbols.get(IMAGE_ASSET.BARx1)!),
      new Block(this.slotSymbols.get(IMAGE_ASSET.BARx2)!),
      new Block(this.slotSymbols.get(IMAGE_ASSET.BARx3)!),
      new Block(this.slotSymbols.get(IMAGE_ASSET.SEVEN)!),*/
    ]);
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
      width: CANVAS.WIDTH,
      height: CANVAS.HEIGHT,
      backgroundColor: 0x000,
      resolution: window.devicePixelRatio || 1,
    });
  }

  private renderSpinner() {
    this.app.stage.addChild(this.spinner);
  }

  private attachLoop(): void {
    this.app.ticker.add((delta) => {
      // TODO: main update logic here
      for (const reel of this.slotReels) {
        for (const block of reel.blocks) {
          // block.y += (Random.int(0, 1000) / 1000) * delta;
          block.y += 4 * delta * (reel.id + 1);
          if (block.y > REEL.HEIGHT) block.y = -REEL.HEIGHT;
        }
      }
    });
  }
}
