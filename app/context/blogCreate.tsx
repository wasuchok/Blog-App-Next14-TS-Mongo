import { createContext, useState } from "react";

  
  // สร้าง Context
  const ThemeContext = createContext<any>(null);
  
  const ThemeProvider : React.FC<any> = ({ children }) => {
    const [theme, setTheme] = useState('light');
  
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  export { ThemeProvider, ThemeContext };