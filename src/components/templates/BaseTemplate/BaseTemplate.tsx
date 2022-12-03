import React from 'react';
import { Box, Paper } from '@mui/material';
import { Navigation } from 'components/features';

interface MainTemplateProps {
  children?: React.ReactNode;
}

export function BaseTemplate(props: MainTemplateProps): JSX.Element {
  const { children } = props;

  return (
    <Box sx={{ pb: 7 }}>
      {children}
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <Navigation />
      </Paper>
    </Box>
  );
}
