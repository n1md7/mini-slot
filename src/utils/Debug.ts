export const Debug = {
  enabled() {
    return window.location.hash.includes('debug');
  },
  disabled() {
    return !this.enabled();
  },
};
