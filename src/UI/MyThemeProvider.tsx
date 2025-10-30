import { CssBaseline, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

import theme from './theme';

interface MyThemeProviderProps extends PropsWithChildren {}

function MyThemeProvider({ children }: MyThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default MyThemeProvider;
