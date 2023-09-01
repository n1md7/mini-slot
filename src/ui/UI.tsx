import type { Component } from 'solid-js';
import PayTable from '/src/ui/pay-table';

const UI: Component = () => {
  return (
    <>
      <PayTable />
      <button class="btn btn-sm btn-primary">+</button>
      <button class="btn btn-sm btn-primary">-</button>
      <button class="btn btn-sm btn-primary">Max BET</button>
      <button class="btn btn-sm btn-primary" id="spin">
        Spin
      </button>
    </>
  );
};

export default UI;
