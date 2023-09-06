import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { doubleEmitter } from '/src/utils/Emitter';
import env from '/src/utils/Env';
import { SOUND_STATUS } from '/src/game/enums';

const SOUND_KEY = 'sound';
const USER_CREDIT_KEY = 'user-credit';
const USER_JACKPOT_KEY = 'user-jackpot';
const SOUND_VOLUME_KEY = 'sound-volume';
const MUSIC_VOLUME_KEY = 'music-volume';

const status = <SOUND_STATUS>localStorage.getItem(SOUND_KEY);
const soundIsOFF = status === SOUND_STATUS.OFF;

const defaults = {
  sound: 15,
  music: 5,
  credit: 35,
  jackpot: 64000,
  muted: false,
};

const userCredit = parseInt(localStorage.getItem(USER_CREDIT_KEY) || '0') || defaults.credit;
const userJackpot = parseInt(localStorage.getItem(USER_JACKPOT_KEY) || '0') || defaults.jackpot;
const soundVolume = parseInt(localStorage.getItem(SOUND_VOLUME_KEY) || '0') || defaults.sound;
const musicVolume = parseInt(localStorage.getItem(MUSIC_VOLUME_KEY) || '0') || defaults.music;

export const [credit, setCredit] = createSignal(userCredit);
export const [jackpot, setJackpot] = createSignal(userJackpot);
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
export const [music, setMusic] = createSignal(musicVolume);
export const [sound, setSound] = createSignal(soundVolume);
export const [isMuted, setIsMuted] = createSignal(soundIsOFF);

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

  const mute = { state: isMuted() };
  changeMute(false);
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
      changeMute(!mute.state);
    },
    adFinished: () => {
      hideAlerts();
      console.log('Ad rewarded!');
      setCredit(credit() + 30);
      window.CrazyGames.SDK.game.gameplayStart();
      changeMute(!mute.state);
    },
  });
};

export const handleWatchAdOneChance = async () => {
  const mute = { state: isMuted() };
  changeMute(false);
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
      changeMute(!mute.state);
    },
    adFinished: () => {
      hideAlerts();
      doubleEmitter.emit('adFinished');
      window.CrazyGames.SDK.game.gameplayStart();
      changeMute(!mute.state);
    },
  });
};

export const addCredit = (value: number) => {
  const valueToSet = credit() + value;
  setCredit(valueToSet);
  localStorage.setItem(USER_CREDIT_KEY, valueToSet.toString());
};
export const subCredit = (value: number) => {
  const valueToSet = credit() - value;
  setCredit(valueToSet);
  localStorage.setItem(USER_CREDIT_KEY, valueToSet.toString());
};
export const incrementBet = () => setBet(bet() + 1);
export const decrementBet = () => setBet(bet() - 1);
export const resetWin = () => setWin(0);
export const doubleWin = () => setWin(win() * 2);
export const toggleAutoSpin = () => setAutoSpin(!autoSpin());
export const toggleMute = () => {
  const value = !isMuted();
  setIsMuted(value);
  doubleEmitter.emit('volumeChange');
  localStorage.setItem(SOUND_KEY, value ? SOUND_STATUS.OFF : SOUND_STATUS.ON);
};
export const changeMute = (value: boolean) => {
  setIsMuted(!value);
  doubleEmitter.emit('volumeChange');
  localStorage.setItem(SOUND_KEY, !value ? SOUND_STATUS.OFF : SOUND_STATUS.ON);
};
export const setDoubleView = () => setView({ isSlot: false, isDouble: true });
export const setSlotView = () => setView({ isSlot: true, isDouble: false });
export const changeMusicVolume = (value: number) => {
  setMusic(value);
  doubleEmitter.emit('volumeChange');
  localStorage.setItem(MUSIC_VOLUME_KEY, value.toString());
};
export const changeSoundVolume = (value: number) => {
  setSound(value);
  doubleEmitter.emit('volumeChange');
  localStorage.setItem(SOUND_VOLUME_KEY, value.toString());
};

export const resetAudioSettings = () => {
  localStorage.setItem(SOUND_VOLUME_KEY, defaults.sound.toString());
  localStorage.setItem(MUSIC_VOLUME_KEY, defaults.music.toString());
  localStorage.setItem(SOUND_KEY, SOUND_STATUS.ON);
  setMusic(defaults.music);
  setSound(defaults.sound);
  setIsMuted(false);
  doubleEmitter.emit('volumeChange');
};

(function jackPotChange() {
  if (!paused()) {
    const value = jackpot() - ~~(Math.random() * 30) - 5;
    localStorage.setItem(USER_JACKPOT_KEY, value.toString());
    setJackpot(value);
  }
  setTimeout(jackPotChange, Math.random() * 10000 + 5000);
})();
