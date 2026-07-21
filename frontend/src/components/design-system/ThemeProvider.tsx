import { createContext, useContext, type CSSProperties, type PropsWithChildren } from 'react';

import { colorTokens } from './ColorTokens';
import { gradients } from './GradientSystem';

type ThemeContextValue = {
  colors: typeof colorTokens;
  gradients: typeof gradients;
};

const ThemeContext = createContext<ThemeContextValue>({
  colors: colorTokens,
  gradients,
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const themeStyle: CSSProperties = {
    background: 'radial-gradient(ellipse at 50% -50%, #4d331f 0%, #1c111a 100%)',
    color: colorTokens.warmIvory,
  };

  return (
    <ThemeContext.Provider value={{ colors: colorTokens, gradients }}>
      <div className="min-h-full" style={themeStyle}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
