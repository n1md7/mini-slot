export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Debug = {
  enabled() {
    return window.location.hash.includes('debug');
  },
  disabled() {
    return !this.enabled();
  },
};
