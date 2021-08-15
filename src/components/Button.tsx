/* eslint-disable react/button-has-type */

import styled from '@emotion/styled';
import { FC, HTMLAttributes } from 'react';
import { withRippleSingle, withRipple } from './Ripple';

type ButtonRawProps = {
  noRipple?: boolean,
};
type ButtonProps = {
  single?: boolean
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
      bp,
    },
  }) => bp({
    desktop: `
      padding: ${padding(1)};
      margin: ${padding(0.8)};
    `,
    tablet: `
      padding: ${padding(0.8)};
      margin: ${padding(0.6)};
    `,
    mobile: `
      padding: ${padding(0.4)};
      margin: ${padding(0.2)};
    `,
    default: `
      border: none;
      background: ${dark};
      color: ${light};
      padding: ${padding(2.5)};
      margin: ${padding(2)};
      display: inline-block;
      border-radius: ${borderRadius(2)};
      box-shadow: ${staticShadow};
      transition: ${set(['background', themeChange], ['boxShadow', hover])
};
      &:hover {
        box-shadow: ${hoverShadow};
      }
    `,
  }),
);

export const ButtonSingle = withRippleSingle(
  ButtonRaw,
  ({ noRipple }) => ({ disable: !!noRipple }),
);
ButtonSingle.displayName = 'withSingleRippleVariant(Button)';

export const ButtonMulti = withRipple(
  ButtonRaw,
  ({ noRipple }) => ({ disable: !!noRipple }),
);
ButtonMulti.displayName = 'withRippleVariant(Button)';

export const Button: FC<ButtonProps & HTMLAttributes<HTMLButtonElement>> = ({
  children,
  single,
  ...props
}) => {
  if (!single) {
    return <ButtonMulti {...props}>{children}</ButtonMulti>;
  }
  return <ButtonSingle {...props}>{children}</ButtonSingle>;
};
Button.displayName = 'ButtonFactory';
