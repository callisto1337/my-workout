import React from 'react';
import { Alert, Box, SxProps, List, ListItem } from '@mui/material';
import { WorkoutPlan } from 'types';

interface WorkoutEditExercisesListProps {
  exercises?: WorkoutPlan['exercises'];
  sx?: SxProps;
}

export function WorkoutEditExercisesList(
  props: WorkoutEditExercisesListProps
): JSX.Element {
  const { exercises, sx } = props;

  return (
    <Box sx={sx}>
      {exercises?.length > 0 ? (
        <List>
          {exercises.map(({ name }, index) => {
            return (
              <ListItem disableGutters key={index}>
                - {name}
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Alert severity="info" variant="outlined">
          Нет добавленных упражнений
        </Alert>
      )}
    </Box>
  );
}
