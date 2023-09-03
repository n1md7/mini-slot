import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

const [credit, setCredit] = createSignal(99);
const [jackpot, setJackpot] = createSignal(999999);
const [bet, setBet] = createSignal(1);
const [win, setWin] = createSignal(0);
const [view, setView] = createStore({
  isGame: true,
  isBonus: false,
});

const addJackpot = (value: number) => setJackpot(jackpot() + value);
const addCredit = (value: number) => setCredit(credit() + value);
const subCredit = (value: number) => setCredit(credit() - value);
const incrementBet = () => setBet(bet() + 1);
const decrementBet = () => setBet(bet() - 1);
const resetWin = () => setWin(0);

setInterval(() => {
  setJackpot(jackpot() - ~~(Math.random() * 100) - 50);
}, 5000);

export {
  credit,
  jackpot,
  bet,
  addJackpot,
  addCredit,
  subCredit,
  incrementBet,
  decrementBet,
  win,
  setWin,
  resetWin,
  view,
  setView,
};
