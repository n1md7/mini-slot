import { Component, createEffect } from 'solid-js';
import { createRef } from '/src/ui/hooks/createRef';
import { credit } from '/src/ui/store';
import Odometer from 'odometer';

import './styles/credits.scss';

const MyCredits: Component = () => {
  const dom = createRef<HTMLDivElement>();
  const odometer = createRef<Odometer>();

  createEffect(
    () => {
      if (odometer.current) return;
      if (!dom.current) return;

      odometer.current = new Odometer({
        el: dom.current,
        value: credit(),
        theme: 'slot-machine',
      });
    },
    { layout: true },
  );

  createEffect(() => {
    odometer.current?.update(credit());
  });

  return (
    <>
      <div class="counter user-credits">
        <div class="label">Credits</div>
        <div ref={dom.current}></div>
      </div>
    </>
  );
};

export default MyCredits;
