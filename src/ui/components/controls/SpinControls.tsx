import { Component, createEffect } from 'solid-js';
import TotalBet from '/src/ui/components/TotalBet';
import { ImSpinner11 } from 'solid-icons/im';
import { Game } from '/src/game/Game';
import { createRef } from '/src/ui/hooks/createRef';
import { win } from '/src/ui/store';

const SpinControls: Component = () => {
  const gameInstance = Game.getInstance();

  const spin = createRef<HTMLButtonElement>();
  const autoSpin = createRef<HTMLButtonElement>();
  const double = createRef<HTMLButtonElement>();
  const takeWin = createRef<HTMLButtonElement>();

  createEffect(() => {
    if (spin) {
      gameInstance.subscribeControls(spin.current!, takeWin.current!, double.current!);
    }

    return () => {
      gameInstance.unsubscribeControls(spin.current!, takeWin.current!, double.current!);
    };
  });

  return (
    <div class="d-flex justify-content-around btn-container">
      <button ref={autoSpin.current} class="btn" id="auto-spin">
        Auto <br /> OFF
      </button>
      <button disabled={win() === 0} ref={double.current} class="btn" id="double">
        Double <br />
        Win
      </button>
      <button ref={spin.current} class="btn" id="spin">
        Spin <br /> <ImSpinner11 />
      </button>
      <button disabled={win() === 0} ref={takeWin.current} class="btn" id="take-win">
        Take <br /> Win
      </button>
      <TotalBet />
    </div>
  );
};

export default SpinControls;
