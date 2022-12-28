import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { wrapperStyles } from './CenteredSpinner.styles';

export function CenteredSpinner(): JSX.Element {
  return (
    <Box sx={wrapperStyles}>
      <CircularProgress />
    </Box>
  );
}
