import React from 'react';
import { Box, Paper } from '@mui/material';
import { Navigation } from 'components/features';

interface MainTemplateProps {
  children?: React.ReactNode;
}

export function MainTemplate(props: MainTemplateProps): JSX.Element {
  const { children } = props;

  return (
    <Box>
      {children}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Navigation />
      </Paper>
    </Box>
  );
}
