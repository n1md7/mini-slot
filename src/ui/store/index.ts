import { createSignal } from 'solid-js';

const [credit, setCredit] = createSignal(0);
const [jackpot, setJackpot] = createSignal(999999);
const [bet, setBet] = createSignal(1);
const [win, setWin] = createSignal(0);

const addJackpot = (value: number) => setJackpot(jackpot() + value);
const addCredit = (value: number) => setCredit(credit() + value);
const incrementBet = () => setBet(bet() + 1);
const decrementBet = () => setBet(bet() - 1);
const resetWin = () => setWin(0);

setInterval(() => {
  setJackpot(jackpot() - ~~(Math.random() * 100) - 50);
}, 5000);

export { credit, jackpot, bet, addJackpot, addCredit, incrementBet, decrementBet, win, setWin, resetWin };
