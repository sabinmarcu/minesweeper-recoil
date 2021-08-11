import { ThemeSelector } from './components/ThemeSelector';
import { GlobalStyles } from './components/GlobalStyles';

export const App = () => (
  <>
    <GlobalStyles />
    <div>
      <h1>App Thing</h1>
      <ThemeSelector />
    </div>
  </>
);
