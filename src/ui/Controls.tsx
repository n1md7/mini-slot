import type { Component } from 'solid-js';
import SpinControls from '/src/ui/components/controls/SpinControls';
import BonusControls from '/src/ui/components/controls/BonusControls';

const Controls: Component = () => {
  return (
    <>
      <SpinControls />
      <BonusControls />
    </>
  );
};

export default Controls;
