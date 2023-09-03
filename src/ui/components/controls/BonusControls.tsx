import { Component } from 'solid-js';

const BonusControls: Component = () => {
  return (
    <div class="d-flex justify-content-around">
      <button class="btn btn-sm btn-primary">Blue</button>
      <button class="btn btn-sm btn-danger">Red</button>
    </div>
  );
};

export default BonusControls;
