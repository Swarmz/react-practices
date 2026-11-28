import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  return <ThemeContext value={{ isDark, setIsDark }}>{children}</ThemeContext>;
}
