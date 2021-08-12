import {
  MutableRefObject,
  useMemo,
  ComponentType,
  forwardRef,
  createElement,
  Children,
  useReducer,
} from 'react';
import styled from '@emotion/styled';
import { nanoid } from 'nanoid';
import { useReplicateRef } from '../../hooks/useReplicateRef';
import {
  Point,
  rippleContainerStyles,
  extractPosition,
  useRippleRef,
  Ripple,
  DurationProp,
  RippleHookType as RippleHookFactory,
  RippleHookProps,
  RippleProps,
} from './common';
import { makeReducer } from '../../utils/makeReducer';

type RippleMultiProps = {
  size: number,
  ripples: RippleSet[],
} & DurationProp;

type RippleHookType = RippleHookFactory<RippleMultiProps>;

type RippleSet = {
  point: Point,
  id: string,
};

const {
  actions,
  reducerParams,
} = makeReducer(
  {
    add: (value: Point): RippleSet => ({
      point: value,
      id: nanoid(),
    }),
    remove: (id: string) => id,
  } as const,
  [] as RippleSet[],
)(
  (actionTypes) => (state, action) => {
    switch (action.type) {
      case actionTypes.add: return [...state, action.payload];
      case actionTypes.remove: return [...state.filter(({ id }) => id !== action.payload)];
      default: return state;
    }
  },
);

export const useRipple = <T extends HTMLElement>(
  ref: MutableRefObject<T | undefined>,
  {
    disable,
    duration = 600,
  }: RippleHookProps = {},
) => {
  const [state, dispatch] = useReducer(...reducerParams);
  const onClick = useMemo(
    () => {
      if (disable) {
        return undefined;
      }
      return (event: MouseEvent) => {
        const action = actions.add(extractPosition(event));
        dispatch(action);
        setTimeout(dispatch, duration, actions.remove(action.payload.id));
      };
    },
    [disable, dispatch],
  );
  const rippleSize = useRippleRef(ref, onClick);
  const shouldRender = useMemo(
    () => state.length > 0,
    [state],
  );
  const rippleProps = useMemo<RippleHookType>(
    () => {
      if (shouldRender) {
        return ({
          size: rippleSize!,
          duration: duration!,
          ripples: state,
          shouldRender: true,
        });
      }
      return { shouldRender: false };
    },
    [rippleSize, duration, shouldRender, state],
  );
  return rippleProps;
};

export const withRipple = <
K extends {},
T extends HTMLElement,
>(
    Component: ComponentType<K>,
    propsTransform?: (props: K) => RippleHookProps,
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
      const hookProps = propsTransform ? propsTransform(props) : {};
      const ripple = useRipple<T>(ref, hookProps);
      if (!ripple.shouldRender) {
        return createElement(StyledComponent, { ...props, ref }, children);
      }
      const { shouldRender, ripples, ...rippleProps } = (ripple || {});
      return createElement(
        StyledComponent,
        {
          ...props,
          ref,
        },
        [
          ...Children.toArray(children),
          ...ripples.map(
            ({ point, id }) => createElement(
              Ripple,
              {
                ...{ ...rippleProps, position: point } as RippleProps,
                key: `ripple-${id}`,
              },
            ),
          ),
        ],
      );
    },
  );
};
