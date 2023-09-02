import { createStore } from 'solid-js/store';

export const [creditStore, setCreditStore] = createStore({
  credit: 0,
});

setInterval(() => {
  setCreditStore('credit', creditStore.credit + ~~(Math.random() * 100));
}, 5000);
