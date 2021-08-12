/* eslint-disable react/button-has-type */

import styled from '@emotion/styled';
import { FC, HTMLAttributes } from 'react';
import { withRipple, withRippleMulti } from './Ripple';

type ButtonRawProps = {
  noRipple?: boolean,
};
type ButtonProps = {
  multi?: boolean
} & ButtonRawProps;

export const ButtonRaw = styled.button<ButtonRawProps>(
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

export const ButtonSingle = withRipple(
  ButtonRaw,
  ({ noRipple }) => ({ disable: !!noRipple }),
);
ButtonSingle.displayName = 'Button Single';

export const ButtonMulti = withRippleMulti(
  ButtonRaw,
  ({ noRipple }) => ({ disable: !!noRipple }),
);
ButtonMulti.displayName = 'Button Multi';

export const Button: FC<ButtonProps & HTMLAttributes<HTMLButtonElement>> = ({
  children,
  multi = true,
  ...props
}) => {
  if (multi) {
    return <ButtonMulti {...props}>{children}</ButtonMulti>;
  }
  return <ButtonSingle {...props}>{children}</ButtonSingle>;
};
