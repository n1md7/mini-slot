import { Component, createEffect, createSignal } from 'solid-js';
import { createRef } from '/src/ui/hooks/createRef';
import { bet, incrementBet, decrementBet } from '/src/ui/store';
import { AiOutlinePlus, AiOutlineMinus } from 'solid-icons/ai';
import Odometer from 'odometer';

import './styles/bet.scss';

type Props = {
  disabled: boolean;
};
const TotalBet: Component<Props> = (props) => {
  const [disabled, setDisabled] = createSignal(false);
  const [className, setClassName] = createSignal('');
  const dom = createRef<HTMLDivElement>();
  const odometer = createRef<Odometer>();

  const MIN = 1;
  const MAX = 15;

  const increment = () => {
    if (bet() < MAX) incrementBet();
  };

  const decrement = () => {
    if (bet() > MIN) decrementBet();
  };

  createEffect(
    () => {
      if (odometer.current) return;
      if (!dom.current) return;

      odometer.current = new Odometer({
        el: dom.current,
        value: bet(),
        theme: 'minimal',
      });
    },
    { layout: true },
  );

  createEffect(() => {
    odometer.current?.update(bet());
  });

  createEffect(() => {
    setDisabled(props.disabled);
    setClassName(props.disabled ? 'disabled' : '');
  });

  return (
    <>
      <div class={`total-bet ${className()}`}>
        <div class="label">Bet</div>
        <div class="controls">
          <button disabled={disabled()} class="btn btn-sm btn-outline-light" onclick={decrement}>
            <AiOutlineMinus />
          </button>
          <span class="value">{bet()}</span>
          <button disabled={disabled()} class="btn btn-sm btn-outline-light" onclick={increment}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </>
  );
};

export default TotalBet;
