import type { Component } from 'solid-js';
import TotalBet from '/src/ui/components/TotalBet';
import PayTable from '/src/ui/components/PayTable';

const Controls: Component = () => {
  return (
    <>
      <div class="d-flex justify-content-around">
        <button class="btn btn-link">Get more credits</button>
        <TotalBet />
        <PayTable />
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
