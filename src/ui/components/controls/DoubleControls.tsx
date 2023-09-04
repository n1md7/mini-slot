import { Component, createEffect } from 'solid-js';
import { doubleEmitter } from '/src/utils/Emitter';
import { DOUBLE } from '/src/game/enums';
import { win } from '/src/ui/store';
import { Game } from '/src/game/Game';

const DoubleControls: Component = () => {
  const gameInstance = Game.getInstance();
  const handlePress = (color: DOUBLE) => () => doubleEmitter.emit('onPress', color);

  createEffect(() => {
    if (win() === 0) gameInstance.showDefaultView();
  });

  return (
    <div class="d-flex justify-content-around double-controls">
      <button onmousedown={handlePress(DOUBLE.BLUE)} class="btn btn-double btn-primary" id="bonus-blue">
        Blue
      </button>
      <button onmousedown={handlePress(DOUBLE.RED)} class="btn btn-double btn-danger" id="bonus-red">
        Red
      </button>
    </div>
  );
};

export default DoubleControls;
