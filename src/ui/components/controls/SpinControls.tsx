import { Component, createEffect, createSignal, Show } from 'solid-js';
import TotalBet from '/src/ui/components/TotalBet';
import { ImSpinner11 } from 'solid-icons/im';
import { Game } from '/src/game/Game';
import { createRef } from '/src/ui/hooks/createRef';
import * as store from '/src/ui/store';

const SpinControls: Component = () => {
  const gameInstance = Game.getInstance();

  const spin = createRef<HTMLButtonElement>();
  const autoSpin = createRef<HTMLButtonElement>();
  const double = createRef<HTMLButtonElement>();
  const takeWin = createRef<HTMLButtonElement>();

  const [spinDisabled, setSpinDisabled] = createSignal(false);
  const [autoSpinDisabled, setAutoSpinDisabled] = createSignal(false);
  const [doubleDisabled, setDoubleDisabled] = createSignal(false);
  const [takeWinDisabled, setTakeWinDisabled] = createSignal(false);

  createEffect(() => {
    setSpinDisabled(store.view.isDouble);
    setDoubleDisabled(store.win() === 0 || store.view.isDouble);
    setTakeWinDisabled(store.win() === 0);
    setAutoSpinDisabled(store.view.isDouble);
  });

  createEffect(() => {
    if (spin) {
      gameInstance.subscribeControls(spin.current!, takeWin.current!, double.current!, autoSpin.current!);
      document.onkeydown = (e) => {
        if (e.code === 'Space') spin.current?.click();
      };
    }

    return () => {
      gameInstance.unsubscribeControls(spin.current!, takeWin.current!, double.current!, autoSpin.current!);
    };
  });

  return (
    <div class="d-flex justify-content-around btn-container">
      <button disabled={autoSpinDisabled()} ref={autoSpin.current} class="btn" id="auto-spin">
        Auto <br />{' '}
        <Show when={store.autoSpin()} fallback="OFF">
          ON
        </Show>
      </button>
      <button disabled={doubleDisabled()} ref={double.current} class="btn" id="double">
        Double <br />
        Win
      </button>
      <button disabled={spinDisabled()} ref={spin.current} class="btn" id="spin">
        Spin <br /> <ImSpinner11 />
      </button>
      <button disabled={takeWinDisabled()} ref={takeWin.current} class="btn" id="take-win">
        Take <br /> Win
      </button>
      <TotalBet disabled={store.view.isDouble} />
    </div>
  );
};

export default SpinControls;
