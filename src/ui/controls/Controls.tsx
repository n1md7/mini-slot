import type { Component } from 'solid-js';

const Controls: Component = () => {
  return (
    <>
      <div class="d-flex justify-content-center" id="controls">
        <button class="btn btn-sm btn-primary" id="spin">
          Spin
        </button>
      </div>
    </>
  );
};

export default Controls;
