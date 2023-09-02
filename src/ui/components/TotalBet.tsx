import { Component, createEffect } from 'solid-js';
import { createRef } from '/src/ui/hooks/createRef';
import { creditStore } from '/src/ui/store';
import Odometer from 'odometer';

import './styles/bet.scss';

const TotalBet: Component = () => {
  const dom = createRef<HTMLDivElement>();
  const odometer = createRef<Odometer>();

  createEffect(
    () => {
      if (odometer.current) return;
      if (!dom.current) return;

      odometer.current = new Odometer({
        el: dom.current,
        value: 1000,
        theme: 'slot-machine',
      });
    },
    { layout: true },
  );

  createEffect(() => {
    odometer.current?.update(creditStore.credit);
  });

  return (
    <>
      <div class="counter total-bet">
        <div class="label">Total Bet</div>
        <div ref={dom.current}></div>
      </div>
    </>
  );
};

export default TotalBet;
