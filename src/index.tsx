import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = createRoot(document.getElementById('app'));

root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </RecoilRoot>
);
