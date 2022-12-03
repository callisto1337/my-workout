import React from 'react';
import { Typography, Box } from '@mui/material';
import { TrainingProgram } from 'components/features';

export function TrainingPage(): JSX.Element {
  return (
    <>
      <Typography variant="h3" sx={{ mt: 2, mx: 2 }}>
        Тренировка
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TrainingProgram />
      </Box>
    </>
  );
}
