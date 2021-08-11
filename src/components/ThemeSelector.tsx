import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeSelection, theme } from "../atoms/theme";

export const ThemeSelector = () => {
  const [selection, setSelection] = useRecoilState(themeSelection);
  const themeValue = useRecoilValue(theme);
  const toggleSelection = useCallback(() => {
    setSelection((t) => (t === "dark" ? "light" : "dark"));
  }, [setSelection]);
  return (
    <div>
      <span>{selection}</span>
      <span>{JSON.stringify(themeValue)}</span>
      <button onClick={toggleSelection}>toggle</button>
    </div>
  );
};
