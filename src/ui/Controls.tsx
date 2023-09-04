import type { Component } from 'solid-js';
import SpinControls from '/src/ui/components/controls/SpinControls';
import DoubleControls from '/src/ui/components/controls/DoubleControls';
import { Show } from 'solid-js';
import { view } from '/src/ui/store';

const Controls: Component = () => {
  return (
    <>
      <Show when={view.isDouble}>
        <DoubleControls />
      </Show>
      <SpinControls />
    </>
  );
};

export default Controls;
