import type { Component } from 'solid-js';

const Controls: Component = () => {
  return (
    <>
      <button class="three-d-button">+</button>
      <button class="btn btn-sm btn-primary">-</button>
      <button class="btn btn-sm btn-primary">Max BET</button>
      <button class="btn btn-sm btn-primary" id="spin">
        Spin
      </button>
    </>
  );
};

export default Controls;
