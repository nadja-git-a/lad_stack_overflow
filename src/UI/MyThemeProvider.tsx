import { CssBaseline, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

import theme from './theme';

function MyThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default MyThemeProvider;
