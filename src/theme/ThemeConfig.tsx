import React, { useMemo, FunctionComponent } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import typography from './typography';
import palette from './palette';
import GlobalStyles from './global';

export const ThemeConfig: FunctionComponent<{}> = ({ children }) => {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography
    }),
    []
  );

  // @ts-ignore
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
