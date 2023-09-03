import type { Component } from 'solid-js';
import SpinControls from '/src/ui/components/controls/SpinControls';
import BonusControls from '/src/ui/components/controls/BonusControls';
import { Show } from 'solid-js';
import { view } from '/src/ui/store';

const Controls: Component = () => {
  return (
    <>
      <Show when={view.isGame}>
        <SpinControls />
      </Show>
      <Show when={view.isBonus}>
        <BonusControls />
      </Show>
    </>
  );
};

export default Controls;
