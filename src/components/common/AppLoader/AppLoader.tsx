import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { containerStyles } from './AppLoader.styles';

export function AppLoader(): JSX.Element {
  return (
    <Box sx={containerStyles}>
      <CircularProgress />
    </Box>
  );
}
