import { render } from 'solid-js/web';
import UI from '/src/ui/UI';

const controls = document.getElementById('controls');

if (!controls) throw new Error('Controls element not found!');

render(() => <UI />, controls);
