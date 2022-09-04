class Audio {
  play() {
    return Promise.resolve();
  }

  pause() {
    return Promise.resolve();
  }
}

global.Audio = Audio;
