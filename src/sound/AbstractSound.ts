type Status = 'ON' | 'OFF';

export class AbstractSound {
  protected status: Status = 'ON';
  protected volume: number = 0.25;

  protected readonly name: string;

  protected constructor(name: string) {
    this.name = name;

    const status = <Status>localStorage.getItem(name);
    const isSet = ['ON', 'OFF'].includes(status);
    this.status = isSet ? status : 'ON';
  }

  protected setVolume(volume: number) {
    this.volume = volume;
  }

  protected isEnabled() {
    return this.status === 'ON';
  }

  protected isDisabled() {
    // LocalStorage can be altered by client
    // So, only "ON" is considered ON, the rest is OFF
    return this.status !== 'ON';
  }

  protected enable() {
    localStorage.setItem(this.name, 'ON');
    this.status = 'ON';
  }

  protected disable() {
    localStorage.setItem(this.name, 'OFF');
    this.status = 'OFF';
  }

  protected toggle() {
    const status = <Status>this.status.replace(/ON|OFF/g, this.status);
    this.status = status;
    localStorage.setItem(this.name, status);
  }
}
