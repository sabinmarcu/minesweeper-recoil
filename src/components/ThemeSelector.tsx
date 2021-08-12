import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeSelection, theme } from '../atoms/theme';
import { Button } from './Button';
import { withRippleMulti } from './Ripple';

const StyledSpan = withRippleMulti(styled.span`
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
      <Button onClick={toggleSelection} multi={false}>toggle</Button>
    </div>
  );
};
