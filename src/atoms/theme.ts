import { atom, selector } from 'recoil';
import { darkTheme, lightTheme } from '../config/colors';
import { localStorageEffect } from '../utils/localStorageEffect';
import { matchMediaEffect } from '../utils/matchMediaEffect';
import shadows from '../config/shadows';
import * as animation from '../config/animation';

const themeMapping = {
  light: lightTheme,
  dark: darkTheme,
};

type ThemeSelection = keyof typeof themeMapping;
const isValidTheme = (
  theme: string,
): theme is ThemeSelection => (
  Object.keys(themeMapping).includes(theme)
);

const LS_KEY = 'app:theme';
export const themeSelection = atom<ThemeSelection>({
  key: 'themeSelection',
  default: 'light',
  effects_UNSTABLE: [
    matchMediaEffect('dark', 'light', ['prefers-color-scheme', 'dark']),
    localStorageEffect<ThemeSelection>(LS_KEY, isValidTheme),
  ],
});

const makeTheme = (selection: ThemeSelection) => {
  const themeChangeAnimation = `${animation.durations.short}ms ${animation.functions.sharp}`;
  return {
    shadows,
    animation: {
      ...animation,
      themeChange: themeChangeAnimation,
    },
    ...themeMapping[selection],
  };
};

export type ThemeType = ReturnType<typeof makeTheme>;

export const theme = selector({
  key: 'theme',
  get: ({ get }) => {
    const selection = get(themeSelection);
    return makeTheme(selection);
  },
});
