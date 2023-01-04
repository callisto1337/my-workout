import React from 'react';
import isEmpty from 'lodash/isEmpty';
import {
  Alert,
  Box,
  SxProps,
  List,
  ListItem,
  ListSubheader,
  Divider,
} from '@mui/material';
import { WorkoutExercise, WorkoutPlan } from 'types';

interface WorkoutEditExercisesListProps {
  exercises?: WorkoutPlan['exercises'];
  sx?: SxProps;
}

export function WorkoutEditExercisesList(
  props: WorkoutEditExercisesListProps
): JSX.Element {
  const { exercises, sx } = props;
  const exercisesByCategories = exercises?.reduce<
    Record<WorkoutExercise['category'], WorkoutExercise[]>
  >((accum, exercise) => {
    const { category } = exercise;
    const prevExercises = [...(accum[category] ? accum[category] : [])];

    accum[category] = [...prevExercises, exercise];

    return accum;
  }, {});
  const categoriesList = Object.keys(exercisesByCategories || [])
    ?.sort()
    .reverse();

  function renderExercisesList() {
    return (
      <>
        {categoriesList.map((category, index) => {
          const exercises = exercisesByCategories[category];

          return (
            <React.Fragment key={category}>
              {index > 0 && <Divider />}
              <List
                subheader={
                  <ListSubheader disableGutters>{category}</ListSubheader>
                }
              >
                {exercises.map(({ name }, index) => (
                  <ListItem disableGutters key={index}>
                    - {name}
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          );
        })}
      </>
    );
  }

  return (
    <Box sx={sx}>
      {isEmpty(exercisesByCategories) ? (
        <Alert severity="info" variant="outlined">
          Нет добавленных упражнений
        </Alert>
      ) : (
        renderExercisesList()
      )}
    </Box>
  );
}
