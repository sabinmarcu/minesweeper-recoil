import {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useMeasure = <T extends HTMLElement>(
  ref: MutableRefObject<T | undefined>,
) => {
  const [rect, setRect] = useState<DOMRect>();
  const measureFunc = useCallback(
    (entries: ResizeObserverEntry[]) => {
      setRect(entries[0].target.getBoundingClientRect());
    },
    [setRect],
  );
  const [observer, setObserver] = useState<ResizeObserver>();
  useEffect(
    () => {
      if (measureFunc) {
        const obs: ResizeObserver = new (
          (window as any).ResizeObserver
          || ResizeObserver
        )(measureFunc);
        setObserver(obs);
        return () => obs.disconnect();
      }
      return undefined;
    },
    [measureFunc, setObserver, ref],
  );
  useEffect(
    () => {
      if (!observer || !ref.current) {
        return undefined;
      }
      const currentRef = ref.current;
      observer.observe(currentRef);
      return () => observer.unobserve(currentRef);
    },
    [ref, observer],
  );
  return rect;
};
