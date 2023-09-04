import { Component } from 'solid-js';

const DoubleControls: Component = () => {
  return (
    <div class="d-flex justify-content-around double-controls">
      <button class="btn btn-bonus btn-primary" id="bonus-blue">
        Blue
      </button>
      <button class="btn btn-bonus btn-danger" id="bonus-red">
        Red
      </button>
    </div>
  );
};

export default DoubleControls;
