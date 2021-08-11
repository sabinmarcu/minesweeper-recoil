import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import { App } from './App';
import { ThemeProvider } from './components/ThemeProvider';

render(
  <RecoilRoot>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root'),
);
