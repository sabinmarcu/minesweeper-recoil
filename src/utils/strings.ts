export const camelCaseToKebabCase = (
  str: string,
): string => str.replace(/([A-Z])/g, (it) => `-${it.toLowerCase()}`);
export const capitalize = (text: string): string => [text[0].toUpperCase(), text.substr(1)].join('');

export type PrefixType<T extends string, K extends string> = `${T}${Capitalize<K>}`;
export type PrefixCombinationType<T extends string, K extends string, V extends string> = `${T}${Capitalize<K>}${Capitalize<V>}`;
export const prefix = <
  T extends string,
  K extends string,
>(prefixStr: T, text: K): PrefixType<T, K> => [
    prefixStr,
    capitalize(text),
  ].join('') as PrefixType<T, K>;
export const prefixCombination = <
  T extends string,
  K extends string,
  V extends string,
>(prefixStr: T, textA: K, textB: V): PrefixCombinationType<T, K, V> => [
    prefixStr,
    capitalize(textA),
    capitalize(textB),
  ].join('') as PrefixCombinationType<T, K, V>;
