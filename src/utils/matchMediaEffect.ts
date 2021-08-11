import { AtomEffect } from 'recoil';

type MatchMediaSet = string | [string, string];

const matchMediaSetToString = (set: MatchMediaSet): string => (typeof set === 'string' ? set : set.join(': '));

const matchMediaSetListToString = (sets: MatchMediaSet[]): string => sets
  .map(matchMediaSetToString)
  .map((it) => `(${it})`)
  .join(' and ');

export const matchMediaEffect = <T>(
  trueValue: T,
  falseValue: T,
  ...media: [MatchMediaSet, ...MatchMediaSet[]]
): AtomEffect<T> => ({ setSelf }) => {
    const mediaString = matchMediaSetListToString(media);

    const match = window.matchMedia(mediaString);

    const changeHandler = () => setSelf(match.matches ? trueValue : falseValue);
    match.addEventListener('change', changeHandler);

    changeHandler();

    return () => match.removeEventListener('change', changeHandler);
  };
