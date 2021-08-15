/* eslint-disable no-param-reassign */
import { PrefixType, prefix } from './strings';

export const makeValue = (
  value: number,
  unit: string,
) => `${value}${unit}`;

export const makeBreakpoint = (
  from?: number,
  to?: number,
  unit: string = 'px',
) => {
  const cond = [];
  if (to) {
    cond.push(['max-width', makeValue(to, unit)]);
  }
  if (from) {
    cond.push(['min-width', makeValue(from, unit)]);
  }
  return cond.map((it) => `(${it.join(':')})`).join(' and ');
};

type BreakpointType<T extends string> = {
  [key in T as
  key
  | PrefixType<'lt', key & string>
  | PrefixType<'gt', key & string>
  ]: string
};

type BreakpointsType<T extends Record<string, number>> = {
  [key in keyof T as
  key
  | PrefixType<'lt', key & string>
  | PrefixType<'gt', key & string>
  ]: string
};

export const makeBreakpoints = <T extends Record<string, number>>(
  bps: T,
) => Object.entries(bps)
    .sort(([,point1], [,point2]) => Math.sign(point1 - point2))
    .reduce<BreakpointsType<typeof bps>>(
    (
      prev,
      [name, point]: [keyof typeof bps & string, number],
      idx,
      sets,
    ) => {
      const bpSet: BreakpointType<typeof name> = {} as any;
      bpSet[prefix('lt', name)] = makeBreakpoint(undefined, point);
      bpSet[prefix('gt', name)] = makeBreakpoint(point);
      if (idx === 0) {
        bpSet[name] = makeBreakpoint(undefined, point);
      } else {
        bpSet[name] = makeBreakpoint(sets[idx - 1][1], point);
      }
      return {
        ...prev,
        ...bpSet,
      };
    },
    {} as any,
  );

export const makeBreakpointFunctions = <T extends Record<string, number>>(
  bps: BreakpointsType<T>,
) => (input: Partial<Record<keyof T | 'default', string | number>>) => Object.entries(input)
    .sort(([k1], [k2]) => (k1 === 'default' && -1)
      || (k2 === 'default' && 1)
      || 0)
    .reduce<string>(
    (prev, [breakpoint, content]) => (breakpoint === 'default'
      ? `
      ${prev}
      ${content}
    `
      : `
      ${prev}
      @media ${bps[breakpoint]} {
        ${content}
      }
    `),
    '',
  );
