import { Reel } from '/src/game/components/reel/Reel';
import { Block } from '/src/game/components/reel/components/Block';
import { Random } from '/src/utils/random';
import { Setup } from '/src/game/Setup';

export class Game extends Setup {
  private static instance: Game;

  private reels!: [Reel, Reel, Reel];

  private constructor() {
    super();

    this.createPixiApplication();
    this.renderSpinner();
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  public override start(): void {
    super.start();

    this.hideSpinner();
    this.attachReels();
    this.drawStoppingLines();
  }

  public attachControls(spin: HTMLButtonElement): void {
    spin.addEventListener('click', async () => {
      if (this.stillRunning()) return;

      await this.reset();
      this.addBlocks();
      await this.spin();
    });
  }

  private stillRunning(): boolean {
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

  private spin() {
    return Promise.all(this.reels.map((reel) => reel.spin()));
  }

  private reset() {
    return Promise.all(this.reels.map((reel) => reel.reset()));
  }
}
