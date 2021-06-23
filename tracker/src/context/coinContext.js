import { useContext } from "react";

const ThemeContext = createContext()

export function coinContextProvider() {
  return (
    <ThemeContext.Provider/>
  )
}