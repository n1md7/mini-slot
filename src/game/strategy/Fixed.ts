import { Strategy } from '/src/game/strategy/Strategy';
import { Symbols } from '/src/game/components/reels/components/Symbols';
import { Random as Randomizer } from '/src/utils/Random';
import { Block } from '/src/game/components/reels/components/Block';
import { IMAGE_ASSET } from '/src/game/enums';
import { Reels } from '/src/game/components/reels/Reels';
import GUI from 'lil-gui';

export type Position = 'Top' | 'Middle' | 'Bottom';

export class Fixed extends Strategy {
  private position: Position;
  private symbol: IMAGE_ASSET;
  private section: GUI;

  constructor(reels: Reels, reelSymbols: Symbols, gui: GUI) {
    super(reels, reelSymbols);

    this.section = gui.addFolder('Fixed mode options');
    this.position = 'Middle';
    this.symbol = IMAGE_ASSET.SEVEN;
  }

  setPosition(position: Position) {
    this.position = position;
  }

  setSymbol(symbol: IMAGE_ASSET) {
    this.symbol = symbol;
  }

  override hideGui() {
    super.hideGui();

    this.section.hide();
  }

  override showGui() {
    super.showGui();

    this.section.show();
  }

  addBlocks() {
    for (const reel of this.reels) {
      reel.stopAt.byPosition(this.position);
      const symbols = Randomizer.pick(this.symbols, reel.capacity);
      const index = this.getIndex(symbols.length);
      for (const { val, idx } of symbols) {
        const value = idx === index ? this.symbol : val;
        reel.addBlock(new Block(this.reelSymbols.get(value)!, value, idx));
      }
    }
  }

  override subscribe() {
    super.subscribe();

    this.section.hide();
    const positions = ['Top', 'Middle', 'Bottom'] as const;
    this.section
      .add(this, 'position', positions)
      .name('Position')
      .setValue('Middle')
      .onChange((position: Position) => {
        this.reset();
        this.position = position;
      });

    this.section
      .add(this, 'symbol', this.symbols)
      .name('Symbol')
      .setValue('Seven')
      .onChange((symbol: IMAGE_ASSET) => {
        this.reset();
        this.symbol = symbol;
      });
  }

  private getIndex(size: number) {
    if (this.position === 'Top') return size - 1;
    return size - 2;
  }
}
