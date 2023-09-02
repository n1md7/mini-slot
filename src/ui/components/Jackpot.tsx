import { Component, createEffect } from 'solid-js';
import { createRef } from '/src/ui/hooks/createRef';
import { jackpot } from '/src/ui/store';
import Odometer from 'odometer';

import './styles/jackpot.scss';

const Jackpot: Component = () => {
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
    odometer.current?.update(jackpot());
  });

  return (
    <>
      <div class="counter jackpot">
        <div class="label">Jackpot</div>
        <div ref={dom.current}></div>
      </div>
    </>
  );
};

export default Jackpot;
