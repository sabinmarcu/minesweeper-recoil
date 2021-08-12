import { useEffect, useRef } from 'react';

export const usePrevious = <T extends unknown>(
  value: T,
) => {
  const ref = useRef<T>();

  useEffect(
    () => {
      ref.current = value;
    },
    [value],
  );

  return ref.current;
};
