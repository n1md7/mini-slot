import { createSignal } from 'solid-js';

const [credit, setCredit] = createSignal(0);
const [jackpot, setJackpot] = createSignal(9999999);
const [bet, setBet] = createSignal(0);

const updateJackpot = (value: number) => setJackpot(jackpot() + value);
const updateCredit = (value: number) => setCredit(credit() + value);
const updateBet = (value: number) => setBet(bet() + value);

setInterval(() => {
  setJackpot(jackpot() - ~~(Math.random() * 100) - 50);
  setBet(bet() + 1);
}, 5000);

export { credit, jackpot, bet, updateJackpot, updateCredit, updateBet };
