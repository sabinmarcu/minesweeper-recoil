/* eslint-disable */

import '@emotion/react';
import type { ThemeType } from '../atoms/theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
