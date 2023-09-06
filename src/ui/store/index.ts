import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { doubleEmitter } from '/src/utils/Emitter';
import env from '/src/utils/Env';

export const [credit, setCredit] = createSignal(35);
export const [jackpot, setJackpot] = createSignal(64000);
export const [bet, setBet] = createSignal(1);
export const [win, setWin] = createSignal(0);
export const [autoSpin, setAutoSpin] = createSignal(false);
export const [view, setView] = createStore({
  isSlot: true,
  isDouble: false,
});
export const [alert, setAlert] = createStore({
  getMoreCredits: false,
  oneMoreChance: false,
});
export const [paused, setPaused] = createSignal(false);
export const [music, setMusic] = createSignal(10);
export const [sound, setSound] = createSignal(30);
export const [isMuted, setIsMuted] = createSignal(false);

export const hideAlerts = () => {
  setAlert({ getMoreCredits: false, oneMoreChance: false });
  setPaused(false);
};
export const adWatchRejected = () => {
  hideAlerts();
  doubleEmitter.emit('adRejected');
};
export const showGetMoreCredits = () => {
  setAlert({ getMoreCredits: true, oneMoreChance: false });
  setPaused(true);
};
export const showOneMoreChance = () => {
  setAlert({ getMoreCredits: false, oneMoreChance: true });
  setPaused(true);
};
export const handleWatchAdReward = async () => {
  if (!env.isCrazyGames()) {
    setCredit(credit() + 30);
    hideAlerts();
    return;
  }

  await window.CrazyGames.SDK.game.gameplayStop();
  window.CrazyGames.SDK.ad.requestAd('rewarded', {
    adStarted: () => {
      console.log('Ad started!');
    },
    adError: (error: string) => {
      hideAlerts();
      console.log('Ad error!', error);
      setCredit(credit() + 10);
      window.CrazyGames.SDK.game.gameplayStart();
    },
    adFinished: () => {
      hideAlerts();
      console.log('Ad rewarded!');
      setCredit(credit() + 30);
      window.CrazyGames.SDK.game.gameplayStart();
    },
  });
};

export const handleWatchAdOneChance = async () => {
  await window.CrazyGames.SDK.game.gameplayStop();
  window.CrazyGames.SDK.ad.requestAd('rewarded', {
    adStarted: () => {
      console.log('Ad started!');
    },
    adError: (error: string) => {
      hideAlerts();
      console.log('Ad error!', error);
      doubleEmitter.emit('adError');
      window.CrazyGames.SDK.game.gameplayStart();
    },
    adFinished: () => {
      hideAlerts();
      doubleEmitter.emit('adFinished');
      window.CrazyGames.SDK.game.gameplayStart();
    },
  });
};

export const addJackpot = (value: number) => setJackpot(jackpot() + value);
export const addCredit = (value: number) => setCredit(credit() + value);
export const subCredit = (value: number) => setCredit(credit() - value);
export const incrementBet = () => setBet(bet() + 1);
export const decrementBet = () => setBet(bet() - 1);
export const resetWin = () => setWin(0);
export const doubleWin = () => setWin(win() * 2);
export const toggleAutoSpin = () => setAutoSpin(!autoSpin());

(function jackPotChange() {
  !paused() && setJackpot(jackpot() - ~~(Math.random() * 30) - 5);
  setTimeout(jackPotChange, Math.random() * 10000 + 5000);
})();
