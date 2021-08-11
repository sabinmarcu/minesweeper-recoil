import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { theme } from '../atoms/theme';

export const ThemeProvider: FC = ({ children }) => {
  const value = useRecoilValue(theme);
  return <EmotionThemeProvider theme={value}>{children}</EmotionThemeProvider>;
};
