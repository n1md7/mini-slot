import type { Component } from 'solid-js';
import TotalBet from '/src/ui/components/TotalBet';

const Controls: Component = () => {
  return (
    <>
      <div>
        <TotalBet />
      </div>
      <div class="controls">
        <button class="btn btn-sm btn-primary">Auto Spin | OFF</button>
        <button class="btn btn-sm btn-primary">Max BET</button>
        <button class="btn btn-sm btn-primary" id="spin">
          Spin | Take Win
        </button>
      </div>
    </>
  );
};

export default Controls;
