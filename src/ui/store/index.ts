import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

export const [credit, setCredit] = createSignal(99);
export const [jackpot, setJackpot] = createSignal(999999);
export const [bet, setBet] = createSignal(1);
export const [win, setWin] = createSignal(0);
export const [autoSpin, setAutoSpin] = createSignal(false);
export const [view, setView] = createStore({
  isSlot: true,
  isDouble: false,
});

export const addJackpot = (value: number) => setJackpot(jackpot() + value);
export const addCredit = (value: number) => setCredit(credit() + value);
export const subCredit = (value: number) => setCredit(credit() - value);
export const incrementBet = () => setBet(bet() + 1);
export const decrementBet = () => setBet(bet() - 1);
export const resetWin = () => setWin(0);
export const doubleWin = () => setWin(win() * 2);
export const toggleAutoSpin = () => setAutoSpin(!autoSpin());

setInterval(() => {
  setJackpot(jackpot() - ~~(Math.random() * 100) - 50);
}, 5000);
