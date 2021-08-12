import { Global, css } from '@emotion/react';
import 'reset-css';

export const GlobalStyles = () => (
  <Global styles={(theme) => css`
    html, body {
      width: 100vw;
      height: 100vw;
      overflow: hidden;
    }
    body {
      background: ${theme.colors.background.base};
      transition: background ${theme.animation.themeChange};
      overflow-y: auto;
    }
  `}
  />
);
