import {
  MutableRefObject,
  useMemo,
  useState,
  ComponentType,
  forwardRef,
  createElement,
  Children,
} from 'react';
import styled from '@emotion/styled';
import { useReplicateRef } from '../../hooks/useReplicateRef';
import {
  Point,
  rippleContainerStyles,
  extractPosition,
  useRippleRef,
  Ripple,
  RippleHookProps,
  RippleHookType as RippleHookFactory,
  RippleProps,
} from './common';

type RippleHookType = RippleHookFactory<RippleProps>;

export const useRippleSingle = <T extends HTMLElement>(
  ref: MutableRefObject<T | undefined>,
  {
    disable,
    duration = 600,
  }: RippleHookProps = {},
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
  const rippleSize = useRippleRef(ref, onClick);
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

export const withRippleSingle = <
K extends {},
T extends HTMLElement,
>(
    Component: ComponentType<K>,
    propsTransform?: (props: K) => RippleHookProps,
  ) => {
  const StyledComponent = styled(Component)(rippleContainerStyles);
  StyledComponent.displayName = `withRippleSingle(${Component.displayName || Component.name})`;
  return forwardRef<T, K>(
    (
      props,
      outerRef,
    ) => {
      const ref = useReplicateRef<T>(outerRef);
      const { children } = props;
      const hookProps = propsTransform ? propsTransform(props) : {};
      const { shouldRender, ...rippleProps } = useRippleSingle<T>(ref, hookProps);
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
