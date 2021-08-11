import { render } from "react-dom";
import { App } from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "./components/ThemeProvider";

console.log('Here');

render(
  <RecoilRoot>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
