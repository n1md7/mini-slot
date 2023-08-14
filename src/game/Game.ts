import { Application, Texture } from 'pixi.js';
import { AUDIO_ASSET, BLOCK, CANVAS, IMAGE_ASSET, REEL } from './enums';
import { Spinner } from './components/spinner/Spinner';
import { SlotSound } from '../sound/slot-sound';
import { Symbols } from './components/reel/components/Symbols';
import { Reel } from '/src/game/components/reel/Reel';
import { Block } from '/src/game/components/reel/components/Block';
import { Random } from '/src/utils/random';
import { Point } from '/src/game/components/reel/components/Point';

export class Game {
  private static instance: Game;

  private readonly spinner = new Spinner();

  private readonly symbols = [
    IMAGE_ASSET.SEVEN,
    IMAGE_ASSET.CHERRY,
    IMAGE_ASSET.BARx1,
    IMAGE_ASSET.BARx2,
    IMAGE_ASSET.BARx3,
  ];

  private slotSound!: SlotSound;
  private slotSymbols!: Symbols;
  private reels!: [Reel, Reel, Reel];
  private app!: Application;

  private constructor() {
    this.createPixiApplication();
    this.renderSpinner();
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
    if (!this.slotSound) throw new Error("[attachAudios] hasn't been called");
    if (!this.slotSymbols) throw new Error("[attachSymbols] hasn't been called");

    this.hideSpinner();
    this.attachReels();
    this.callSetupOnce();
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

  public attachControls(spin: HTMLButtonElement): void {
    spin.addEventListener('click', async () => {
      if (this.reelIsSpinning()) return;

      await this.reset();
      this.addBlocks();
      await this.spin();
    });
  }

  private reelIsSpinning(): boolean {
    return this.reels.some((reel) => reel.isSpinning);
  }

  private attachReels() {
    this.reels = [
      new Reel({ spinTime: '2.0 sec', id: 0 }),
      new Reel({ spinTime: '2.4 sec', id: 1 }),
      new Reel({ spinTime: '2.8 sec', id: 2 }),
    ];
    this.app.stage.addChild(...this.reels);
  }

  private addBlocks() {
    const [reel01, reel02, reel03] = this.reels;

    const reel01Symbols = Random.pick(this.symbols, 8);
    const reel02Symbols = Random.pick(this.symbols, 16);
    const reel03Symbols = Random.pick(this.symbols, 24);

    for (const { val, idx } of reel01Symbols) reel01.addBlock(new Block(this.slotSymbols.get(val)!, idx));
    for (const { val, idx } of reel02Symbols) reel02.addBlock(new Block(this.slotSymbols.get(val)!, idx));
    for (const { val, idx } of reel03Symbols) reel03.addBlock(new Block(this.slotSymbols.get(val)!, idx));
  }

  private hideSpinner(): void {
    this.spinner.destroy();
  }

  private createPixiApplication(): void {
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

  private renderSpinner() {
    this.app.stage.addChild(this.spinner);
  }

  private drawStoppingLines(): void {
    this.app.stage.addChild(
      new Point(0, BLOCK.HEIGHT / 2),
      new Point(0, REEL.HEIGHT / 2),
      new Point(0, REEL.HEIGHT - BLOCK.HEIGHT / 2),

      new Point(CANVAS.WIDTH - Point.width, BLOCK.HEIGHT / 2),
      new Point(CANVAS.WIDTH - Point.width, REEL.HEIGHT / 2),
      new Point(CANVAS.WIDTH - Point.width, REEL.HEIGHT - BLOCK.HEIGHT / 2),
    );
  }

  private callSetupOnce(): void {
    this.drawStoppingLines();
  }

  private spin() {
    return Promise.all(this.reels.map((reel) => reel.spin()));
  }

  private reset() {
    return Promise.all(this.reels.map((reel) => reel.reset()));
  }
}
