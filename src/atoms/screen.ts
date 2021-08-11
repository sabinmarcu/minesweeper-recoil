import { atom } from 'recoil';

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { width: innerWidth, height: innerHeight };
};

export const screenSize = atom({
  default: getWindowSize(),
  key: 'screenSize',
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const handler = () => {
        setSelf(getWindowSize());
      };
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    },
  ],
});
