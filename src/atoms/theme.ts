import { atom, selector } from "recoil";
import { darkTheme, lightTheme } from "../config/theme";
import { localStorageEffect } from "../utils/localStorageEffect";
import { matchMediaEffect } from "../utils/matchMediaEffect";

const themeMapping = {
  light: lightTheme,
  dark: darkTheme
};

type ThemeSelection = keyof typeof themeMapping;
const isValidTheme = (theme: string): theme is ThemeSelection =>
  Object.keys(themeMapping).includes(theme);

const LS_KEY = "app:theme";
export const themeSelection = atom<ThemeSelection>({
  key: "themeSelection",
  default: "light",
  effects_UNSTABLE: [
    matchMediaEffect("dark", "light", ["prefers-color-scheme", "dark"]),
    localStorageEffect<ThemeSelection>(LS_KEY, isValidTheme)
  ]
});

export const theme = selector({
  key: "theme",
  get: ({ get }) => {
    const selection = get(themeSelection);
    return themeMapping[selection];
  }
});