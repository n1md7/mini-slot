import GUI from 'lil-gui';
import { Debug } from '/src/utils/Debug';

export const gui = new GUI({
  title: 'Slot Machine',
});

// Only show when hash #debug is present in the URL
gui.show(Debug.enabled());
