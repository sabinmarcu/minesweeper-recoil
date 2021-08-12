import { parseToHsl, toColorString } from 'polished';
import { clamp } from './math';

export const lighten = (color: string, amount: number): string => {
  const hsl = parseToHsl(color);
  hsl.lightness = clamp(hsl.lightness + hsl.lightness * amount);
  return toColorString(hsl);
};

export const darken = (color: string, amount: number): string => {
  const hsl = parseToHsl(color);
  hsl.lightness = clamp(hsl.lightness - hsl.lightness * amount);
  return toColorString(hsl);
};
