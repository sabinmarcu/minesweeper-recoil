import { AtomEffect } from 'recoil';

type LSValidator<T> = (val: any) => val is T;

export const localStorageEffect = <T>(
  key: string,
  validator: LSValidator<T>,
): AtomEffect<T> => ({ setSelf, onSet }) => {
    const attemptLoadFromLocalstorage = (val: any) => {
      try {
        const value = JSON.parse(val);
        if (validator(value)) {
          setSelf(value);
        }
      } catch { /* skip */ }
    };

    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      attemptLoadFromLocalstorage(savedValue);
    }

    onSet((newValue: any, oldValue: any) => {
      if (newValue === oldValue) {
        return;
      }
      if (typeof newValue === 'undefined') {
        localStorage.removeItem(key);
      } else if (validator(newValue)) {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });

    const localStorageHandler = ({
      storageArea,
      newValue,
      oldValue,
      key: eKey,
    }) => {
      if (key !== eKey || storageArea !== localStorage || newValue === oldValue) {
        return;
      }
      attemptLoadFromLocalstorage(newValue);
    };

    window.addEventListener('storage', localStorageHandler);
    return () => window.removeEventListener('storage', localStorageHandler);
  };
