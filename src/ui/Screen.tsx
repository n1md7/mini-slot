import { Component } from 'solid-js';
import Credits from '/src/ui/components/Credits';
import Jackpot from '/src/ui/components/Jackpot';
import CurrentWin from '/src/ui/components/CurrentWin';

import './components/styles/screen.scss';

const Screen: Component = () => {
  return (
    <div class="d-flex justify-content-around screen">
      <Credits />
      <Jackpot />
      <CurrentWin />
    </div>
  );
};

export default Screen;
