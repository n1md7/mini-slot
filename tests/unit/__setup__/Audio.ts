export class MockedAudio extends HTMLAudioElement {
  override play() {
    return Promise.resolve();
  }

  override pause() {
    return Promise.resolve();
  }
}

customElements.define('mocked-audio', MockedAudio, { extends: 'audio' });
