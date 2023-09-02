import { Component, createEffect } from 'solid-js';
import { createRef } from '/src/ui/hooks/createRef';
import { win } from '/src/ui/store';
import Odometer from 'odometer';

import './styles/win.scss';

const CurrentWin: Component = () => {
  const dom = createRef<HTMLDivElement>();
  const odometer = createRef<Odometer>();

  createEffect(
    () => {
      if (odometer.current) return;
      if (!dom.current) return;

      odometer.current = new Odometer({
        el: dom.current,
        value: win(),
        theme: 'slot-machine',
        duration: 300,
      });
    },
    { layout: true },
  );

  createEffect(() => {
    odometer.current?.update(win());
  });

  return (
    <>
      <div class="counter current-win">
        <div class="label">Win</div>
        <div ref={dom.current}></div>
      </div>
    </>
  );
};

export default CurrentWin;
