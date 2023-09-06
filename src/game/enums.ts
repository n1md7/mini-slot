export enum IMAGE_ASSET {
  CHERRY = 'CHERRY',
  SEVEN = 'SEVEN',
  BARx1 = 'BARx1',
  BARx2 = 'BARx2',
  BARx3 = 'BARx3',
  BACKGROUND = 'BACKGROUND',
}

export enum AUDIO_ASSET {
  WIN = 'WIN',
  SPIN = 'SPIN',
  COIN_WIN = 'COIN_WIN',
  LOSE_BEEPS = 'LOSE_BEEPS',
  REEL_SPIN = 'REEL_SPIN',
  WIN_ALERT = 'WIN_ALERT',
  BACKGROUND_MUSIC = 'BACKGROUND_MUSIC',
}

export enum BUNDLE {
  IMAGES = 'IMAGES',
  AUDIOS = 'AUDIOS',
}

export enum CANVAS {
  WIDTH = 426,
  HEIGHT = 240,
}

export enum REEL {
  WIDTH = 142, // 426 / 3
  HEIGHT = 240,
}

export enum BLOCK {
  WIDTH = 142,
  HEIGHT = 120, // 240 / 2
  LINE_THICKNESS = 1,
}

export enum VIEW {
  BONUS = 'BONUS',
  SLOT = 'SLOT',
}

export enum ENV {
  TEST = 'test',
  DEV = 'development',
  PROD = 'production',
  CRAZY_GAMES = 'crazy',
  GITHUB_PAGES = 'github',
}

export enum DOUBLE {
  RED = 'RED',
  BLUE = 'BLUE',
}

export enum SOUND_STATUS {
  ON = 'ON',
  OFF = 'OFF',
}
