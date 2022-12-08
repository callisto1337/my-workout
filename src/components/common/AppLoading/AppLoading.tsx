import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { containerStyles } from './AppLoading.styles';

export function AppLoading(): JSX.Element {
  return (
    <Box sx={containerStyles}>
      <CircularProgress />
    </Box>
  );
}
