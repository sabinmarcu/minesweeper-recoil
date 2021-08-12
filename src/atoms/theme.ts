import { atom, selector } from 'recoil';
import { darkTheme, lightTheme } from '../config/colors';
import * as geometry from '../config/geometry';
import * as animation from '../config/animation';
import * as animate from '../config/animate';
import * as transition from '../config/transitions';
import shadows from '../config/shadows';
import { localStorageEffect } from '../effects/localStorageEffect';
import { matchMediaEffect } from '../effects/matchMediaEffect';

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

const makeTheme = (selection: ThemeSelection) => ({
  shadows: [...shadows],
  animation: { ...animation },
  animate: { ...animate },
  transition: { ...transition },
  geometry: { ...geometry },
  colors: themeMapping[selection],
});

export type ThemeType = ReturnType<typeof makeTheme>;

export const theme = selector({
  key: 'theme',
  get: ({ get }) => {
    const selection = get(themeSelection);
    return makeTheme(selection);
  },
});
