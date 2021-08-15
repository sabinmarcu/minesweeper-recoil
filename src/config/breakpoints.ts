import { makeBreakpointFunctions, makeBreakpoints } from '../utils/breakpoints';

export const config = {
  desktop: 1200,
  tablet: 1000,
  mobile: 800,
} as const;

export const breakpoints = makeBreakpoints(config);
export const bp = makeBreakpointFunctions(breakpoints);
