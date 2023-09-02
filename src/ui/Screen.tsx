import { Component } from 'solid-js';
import Credits from '/src/ui/components/Credits';
import TotalBet from '/src/ui/components/TotalBet';
import Jackpot from '/src/ui/components/Jackpot';

import './components/styles/screen.scss';

const Screen: Component = () => {
  return (
    <div class="d-flex justify-content-around my-1 screen">
      <Credits />
      <Jackpot />
      <TotalBet />
    </div>
  );
};

export default Screen;
