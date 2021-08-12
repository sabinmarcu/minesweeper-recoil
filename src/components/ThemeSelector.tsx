import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeSelection, theme } from '../atoms/theme';
import { Button } from './Button';
import { withRipple } from './Ripple';

const StyledSpan = withRipple(styled.span`
  display: block;
`);

export const ThemeSelector = () => {
  const [selection, setSelection] = useRecoilState(themeSelection);
  const themeValue = useRecoilValue(theme);
  const toggleSelection = useCallback(() => {
    setSelection((t) => (t === 'dark' ? 'light' : 'dark'));
  }, [setSelection]);
  return (
    <div>
      <StyledSpan>{selection}</StyledSpan>
      <StyledSpan>{JSON.stringify(themeValue)}</StyledSpan>
      <br />
      <Button onClick={toggleSelection} single>toggle</Button>
    </div>
  );
};
