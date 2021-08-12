/* eslint-disable react/button-has-type */

import { PropsOf } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { withRipple } from './Ripple';

export const ButtonRaw = styled.button(
  ({
    theme: {
      colors: {
        background: { dark },
        text: { light },
      },
      geometry: {
        padding,
        borderRadius,
      },
      shadows: [,staticShadow,,,hoverShadow],
      animate: {
        set,
      },
      animation: {
        themeChange,
        hover,
      },
    },
  }) => `
    border: none;
    background: ${dark};
    color: ${light};
    padding: ${padding(1)};
    margin: ${padding(0.8)};
    display: inline-block;
    border-radius: ${borderRadius(2)};
    box-shadow: ${staticShadow};
    transition: ${set(['background', themeChange], ['boxShadow', hover])
};
    &:hover {
      box-shadow: ${hoverShadow};
    }
  `,
);

export const Button = withRipple(
  forwardRef<HTMLButtonElement, PropsOf<typeof ButtonRaw>>(
    ({ children, ...props }, ref) => (
      <ButtonRaw ref={ref} {...props}>
        {children}
      </ButtonRaw>
    ),
  ),
);
Button.displayName = 'Button';
