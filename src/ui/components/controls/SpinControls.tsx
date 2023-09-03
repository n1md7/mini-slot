import { Component } from 'solid-js';
import TotalBet from '/src/ui/components/TotalBet';
import { ImSpinner11 } from 'solid-icons/im';
const SpinControls: Component = () => {
  return (
    <div class="d-flex justify-content-around btn-container">
      <button class="btn" id="auto-spin">
        Auto <br /> OFF
      </button>
      <button class="btn" id="double">
        Double <br />
        Win
      </button>
      <button class="btn" id="spin">
        Spin <br /> <ImSpinner11 />
      </button>
      <button class="btn" id="take-win">
        Take <br /> Win
      </button>
      <TotalBet />
    </div>
  );
};

export default SpinControls;
