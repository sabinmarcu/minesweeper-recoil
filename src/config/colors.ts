import { darken, lighten } from '../utils/colors';

type ThemeInput = {
  background: string;
  text: string;
  eight: string;
  seven: string;
  six: string;
  five: string;
  four: string;
  three: string;
  two: string;
  one: string;
};

type CompositeThemeProps = {
  background: CompositeColor,
  text: CompositeColor
};

type CompositeColor = {
  base: string,
  light: string,
  dark: string,
};

export type ThemeType = Omit<ThemeInput, keyof CompositeThemeProps> & CompositeThemeProps;

const upgradeColor = (color: string): CompositeColor => ({
  base: color,
  light: lighten(color, 0.3),
  dark: darken(color, 0.5),
});

const upgradeTheme = (input: ThemeInput): ThemeType => ({
  ...input,
  background: upgradeColor(input.background),
  text: upgradeColor(input.text),
});

const darkColors: ThemeInput = {
  background: '#333745',
  text: '#888',
  eight: '#69140E',
  seven: '#A44200',
  six: '#D58936',
  five: '#FFF94F',
  four: '#768DEB',
  three: '#468189',
  two: '#7EA172',
  one: '#96939B',
};

const lightColors: ThemeInput = {
  background: '#CCC8BA',
  text: '#ccc',
  eight: '#96EBF1',
  seven: '#5BBDFF',
  six: '#2A76C9',
  five: '#0006B0',
  four: '#897214',
  three: '#B97E76',
  two: '#815E8D',
  one: '#696C64',
};

export const darkTheme = upgradeTheme(darkColors);
export const lightTheme = upgradeTheme(lightColors);
