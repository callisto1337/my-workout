import React from 'react';
import { Typography, Box } from '@mui/material';
import { MainTemplate } from 'components/templates';
import { TrainingProgram } from 'components/features';

export function MainPage(): JSX.Element {
  return (
    <MainTemplate>
      <Typography variant="h3" sx={{ mt: 2, mx: 2 }}>
        Тренировка
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TrainingProgram />
      </Box>
    </MainTemplate>
  );
}
