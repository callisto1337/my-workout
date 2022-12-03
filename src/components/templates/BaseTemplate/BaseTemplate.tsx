import React from 'react';
import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navigation } from 'components/features';

export function BaseTemplate(): JSX.Element {
  return (
    <Box sx={{ pb: 7 }}>
      <Outlet />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <Navigation />
      </Paper>
    </Box>
  );
}
