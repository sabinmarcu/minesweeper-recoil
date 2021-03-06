import { ThemeSelector } from './components/ThemeSelector';
import { GlobalStyles } from './components/GlobalStyles';
import { Button } from './components/Button';

export const App = () => (
  <>
    <GlobalStyles />
    <div>
      <h1>App Thing</h1>
      <ThemeSelector />
      <Button>Click Me!!!</Button>
      <Button onClick={() => {}}>Click Me!!!</Button>
      <Button noRipple>No Ripple!!!</Button>
      <Button noRipple onClick={() => {}}>No Ripple!!!</Button>
      <Button single>Single Ripple!!!</Button>
      <Button single onClick={() => {}}>Single Ripple!!!</Button>
    </div>
  </>
);
