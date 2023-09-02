export const createRef = <T = unknown>() => {
  return { current: undefined } as { current: T | undefined };
};
