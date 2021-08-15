import { atom, selector } from 'recoil';
import { config as bpc } from '../config/breakpoints';

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { width: innerWidth, height: innerHeight };
};

export const screenSize = atom({
  default: getWindowSize(),
  key: 'screenSize',
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const handler = () => {
        setSelf(getWindowSize());
      };
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    },
  ],
});

const values = Object.entries(bpc).sort(([, a], [, b]) => a - b);

export const breakpoints = selector({
  key: 'breakpoints',
  get: ({ get }) => {
    const { width } = get(screenSize);
    const idx = values.findIndex(([key, value]) => {
      if (value > width) {
        return key;
      }
      return undefined;
    });
    const actualIdx = idx >= 0 ? idx : values.length - 1;
    return values[actualIdx][0];
  },
});

type Orientation = 'portrait' | 'landscape';
const getOrientation = (): Orientation => {
  if (window.screen.orientation) {
    return window.screen.orientation.type.includes('portrait')
      ? 'portrait'
      : 'landscape';
  }
  if (window.orientation) {
    return parseInt(`${window.orientation}`, 10) % 180 === 0
      ? 'portrait'
      : 'landscape';
  }
  const { width, height } = getWindowSize();
  return width / height > 1 ? 'landscape' : 'portrait';
};

export const orientation = atom({
  key: 'orientation',
  default: getOrientation(),
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const handler = () => {
        setSelf(getOrientation());
      };
      // @ts-ignore
      if (window.screen.addEventListener) {
        // @ts-ignore
        window.screen.addEventListener('orientationchange', handler);
        // @ts-ignore
        return () => window.screen.removeEventListener('orientationchange', handler);
      }
      if (window.orientation) {
        window.addEventListener('orientationchange', handler);
        return () => window.removeEventListener('orientationchange', handler);
      }
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    },
  ],
});
