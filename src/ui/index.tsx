import { render } from 'solid-js/web';
import { controls, screen } from '/src/ui/dom';
import Controls from '/src/ui/Controls';
import Screen from '/src/ui/Screen';

render(() => <Controls />, controls);
render(() => <Screen />, screen);
