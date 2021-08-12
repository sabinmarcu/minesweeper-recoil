import { CSSProperties } from 'react';
import { camelCaseToKebabCase } from '../utils/strings';
import {
  durations,
  functions,
  TransitionDuration,
  TransitionFunction,
} from './transitions';

export type TransitionPair = [TransitionDuration, TransitionFunction];
export type TransitionType = string | TransitionPair;
export type TransitionSet = [keyof CSSProperties, TransitionType];

export const make = (
  ...[duration, func]: TransitionPair
) => [`${durations[duration]}ms`, functions[func]].join(' ');

const makeTransition = (transition: TransitionType) => (typeof transition === 'string'
  ? transition
  : make(...transition)
);

export const set = (
  ...sets: TransitionSet[]
) => sets.map(
  ([prop, transition]) => [
    camelCaseToKebabCase(prop),
    makeTransition(transition),
  ].join(' '),
).join(', ');

export const all = (
  ...props: (keyof CSSProperties)[]
) => (
  anim: string,
) => set(
  ...props.map<TransitionSet>(
    (prop) => [prop, anim],
  ),
);
