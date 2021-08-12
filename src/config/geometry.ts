import { modularScale } from 'polished';

const em = (value: string) => `${value}em`;

export const spacing = (step: number) => em(modularScale(step, 1));

export const padding = (step: number) => [
  modularScale(step, 1),
  modularScale(step, 1.2),
].map((it) => em(it)).join(' ');

export const borderRadius = (step: number) => `${step * 1.5}px`;
