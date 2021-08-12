import { keyframes, css } from '@emotion/react';
import { MutableRefObject, useEffect, useMemo } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { useMeasure } from '../../hooks/useMeasure';

export type DurationProp = { duration: number };

export type RippleProps = {
  size: number,
  position: Point,
} & DurationProp;

export type Point = {
  x: number;
  y: number;
};

export type RippleHookType<P> = { shouldRender: false }
| { shouldRender: true } & P;

export type RippleHookProps = {
  disable?: boolean,
  duration?: number,
};

export const rippleAnimation = keyframes`
  from {
    transform: scale(1);
    opacity: 0.7;
  }
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

export const rippleContainerStyles = `
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

export const extractPosition = (event: MouseEvent): Point => ({
  x: event.offsetX,
  y: event.offsetY,
});

export const useRippleRef = <T extends HTMLElement>(
  ref: MutableRefObject<T | undefined>,
  onClick: ((event: MouseEvent) => void) | undefined,
) => {
  useEffect(
    () => {
      if (onClick && ref.current) {
        const element = ref.current;
        element.addEventListener('click', onClick);
        return () => element.removeEventListener('click', onClick);
      }
      return undefined;
    },
    [onClick, ref],
  );
  const size = useMeasure<T>(ref);
  const rippleSize = useMemo(
    () => (size ? Math.max(size.width, size.height) / 2 : 0),
    [size],
  );
  return rippleSize;
};

export const Ripple = styled(
  'div',
  { shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size' },
)<RippleProps>(
  ({
    size,
    position,
    duration,
    theme: {
      colors: {
        background: {
          light,
        },
      },
    },
  }) => css`
    position: absolute;
    pointer-events: none;
    width: ${size}px;
    height: ${size}px;
    left: ${position.x - size / 2}px;
    top: ${position.y - size / 2}px;
    border-radius: ${size / 2}px;
    animation: ${rippleAnimation} ${duration}ms linear;
    background-color: ${light};
    transform: scale(4);
    opacity: 0;
  `,
);
