import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MainPage } from 'components/pages';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function App(): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
}
