import { render } from 'solid-js/web';
import { controls, menu, screen } from '/src/ui/dom';
import Controls from '/src/ui/Controls';
import Screen from '/src/ui/Screen';
import { Menu } from '/src/ui/Menu';

render(() => <Controls />, controls);
render(() => <Screen />, screen);
render(() => <Menu />, menu);
