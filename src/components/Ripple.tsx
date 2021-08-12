import {
  MutableRefObject,
  useEffect,
  useMemo,
  useState,
  ComponentType,
  forwardRef,
  createElement,
  Children,
} from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useMeasure } from '../hooks/useMeasure';
import { useReplicateRef } from '../hooks/useReplicateRef';

type DurationProp = { duration: number };

type Point = {
  x: number;
  y: number;
};

type RippleType = {
  size: number,
  position: Point,
} & DurationProp;

type RippleHookType = { shouldRender: false }
| { shouldRender: true } & RippleType;

const extractPosition = (event: MouseEvent): Point => ({
  x: event.offsetX,
  y: event.offsetY,
});

export const useRipple = <T extends HTMLElement>(
  ref: MutableRefObject<T | undefined>,
  {
    disable,
    duration = 600,
  }: {
    disable?: boolean,
    duration?: number,
  } = {},
) => {
  const [ripplePosition, setRipplePosition] = useState<Point>();
  const onClick = useMemo(
    () => {
      if (disable) {
        return undefined;
      }
      return (event: MouseEvent) => {
        setRipplePosition(undefined);
        setRipplePosition(extractPosition(event));
      };
    },
    [disable, setRipplePosition],
  );
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
  const shouldRender = useMemo(
    () => !!(rippleSize && ripplePosition),
    [rippleSize, ripplePosition],
  );
  const rippleProps = useMemo<RippleHookType>(
    () => {
      if (!shouldRender) {
        return { shouldRender: false };
      }
      return ({
        size: rippleSize!,
        duration: duration!,
        position: ripplePosition!,
        shouldRender: true,
      });
    },
    [rippleSize, duration, ripplePosition, shouldRender],
  );
  return rippleProps;
};

const rippleAnimation = keyframes`
  from {
    transform: scale(1);
    opacity: 0.7;
  }
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

export type RippleProps = RippleType;

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

const rippleContainerStyles = `
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

export const withRipple = <
K extends {},
T extends HTMLElement,
>(
    Component: ComponentType<K>,
  ) => {
  const StyledComponent = styled(Component)(rippleContainerStyles);
  StyledComponent.displayName = `withRipple(${Component.displayName || Component.name})`;
  return forwardRef<T, K>(
    (
      props,
      outerRef,
    ) => {
      const ref = useReplicateRef<T>(outerRef);
      const { children } = props;
      const { shouldRender, ...rippleProps } = useRipple<T>(ref);
      return createElement(
        StyledComponent,
        {
          ...props,
          ref,
        },
        shouldRender
          ? [
            ...Children.toArray(children),
            createElement(
              Ripple,
              {
                ...rippleProps as RippleProps,
                key: 'ripple',
              },
            ),
          ]
          : children,
      );
    },
  );
};
