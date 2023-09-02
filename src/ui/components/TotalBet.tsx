import { Component, createEffect } from 'solid-js';
import { createRef } from '/src/ui/hooks/createRef';
import { bet, incrementBet, decrementBet } from '/src/ui/store';
import Odometer from 'odometer';

import './styles/bet.scss';

const TotalBet: Component = () => {
  const dom = createRef<HTMLDivElement>();
  const odometer = createRef<Odometer>();

  const MIN = 1;
  const MAX = 5;

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

  return (
    <>
      <div class="total-bet">
        <div class="label">Bet</div>
        <div class="controls">
          <button class="btn btn-sm btn-secondary" onclick={decrement}>
            -
          </button>
          <span class="value">{bet()}</span>
          <button class="btn btn-sm btn-secondary" onclick={increment}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default TotalBet;
