import React, { useLayoutEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import urlJoin from 'url-join';
import isEmpty from 'lodash/isEmpty';
import { child, get, update, set } from 'firebase/database';
import { Box, Grid, Divider, Typography, Alert } from '@mui/material';
import { dbRef } from 'services/firebase';
import { ROUTES, SNAPSHOT_PATHS } from 'utils/constants';
import { CenteredSpinner, Snackbar } from 'components/common';
import { ExercisesList } from 'components/features';
import { WorkoutExercise, WorkoutPlan } from 'types';
import {
  WorkoutEditInput,
  WorkoutEditRemoveWorkoutButton,
  WorkoutEditAddExerciseButton,
} from './components';
import { getCategories } from 'utils/methods';
import { alertStyles, contentWrapperStyles } from './WorkoutEdit.styles';

export function WorkoutEdit(): JSX.Element {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>();
  const [isFailedSnackbarShown, setIsFailedSnackbarShown] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>();
  const { id } = useParams();
  const navigate = useNavigate();
  const workoutPlanPath = urlJoin(SNAPSHOT_PATHS.WORKOUT_PLANS, id);
  const exercisesCategories = getCategories(workoutPlan?.exercises);

  function getWorkoutPlan() {
    setIsLoading(true);

    get(child(dbRef, workoutPlanPath))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setWorkoutPlan(snapshot.val());
        } else {
          navigate(ROUTES.WORKOUT_PLANS);
        }
      })
      .catch(() => {
        setIsFailedSnackbarShown(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function updateWorkoutPlan(plan: WorkoutPlan) {
    setWorkoutPlan(plan);

    return update(dbRef, {
      [workoutPlanPath]: plan,
    });
  }

  function updateWorkoutPlanName(name: string) {
    return updateWorkoutPlan({
      ...workoutPlan,
      name,
    });
  }

  function removeWorkoutPlan() {
    return get(child(dbRef, SNAPSHOT_PATHS.WORKOUT_PLANS))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          delete data[id];

          return set(dbRef, { [SNAPSHOT_PATHS.WORKOUT_PLANS]: data });
        }
      })
      .then(() => {
        navigate(ROUTES.WORKOUT_PLANS);
      });
  }

  function addExercise(newExercise: WorkoutExercise) {
    const prevExercises = workoutPlan?.exercises || [];
    const updatedWorkoutPlan = {
      ...workoutPlan,
      exercises: [...prevExercises, newExercise],
    };

    return updateWorkoutPlan(updatedWorkoutPlan).then(() => {
      setWorkoutPlan(updatedWorkoutPlan);
    });
  }

  function removeExercise(id: number) {
    const newWorkoutPlan = { ...workoutPlan };

    newWorkoutPlan.exercises.splice(id, 1);

    return updateWorkoutPlan(newWorkoutPlan).then(() => {
      setWorkoutPlan(newWorkoutPlan);
    });
  }

  function hideFailedSnackbar() {
    setIsFailedSnackbarShown(false);
  }

  useLayoutEffect(() => {
    getWorkoutPlan();
  }, []);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  return (
    <>
      <Box sx={contentWrapperStyles}>
        <Grid container spacing={2}>
          <Grid item width="100%">
            <WorkoutEditInput
              name={workoutPlan?.name}
              onSubmit={updateWorkoutPlanName}
            />
          </Grid>
          <Grid item width="100%">
            <Typography variant="h6">Упражнения</Typography>
            {isEmpty(workoutPlan?.exercises) ? (
              <Alert severity="info" variant="outlined" sx={alertStyles}>
                Нет добавленных упражнений
              </Alert>
            ) : (
              <ExercisesList
                exercises={workoutPlan?.exercises}
                onRemove={removeExercise}
                canRemove
              />
            )}
          </Grid>
          <Grid item width="100%">
            <WorkoutEditAddExerciseButton
              onAdd={addExercise}
              categories={exercisesCategories}
            />
          </Grid>
          <Grid item width="100%">
            <Divider />
          </Grid>
          <Grid item width="100%">
            <WorkoutEditRemoveWorkoutButton
              onRemove={removeWorkoutPlan}
              name={workoutPlan?.name}
            />
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={isFailedSnackbarShown} onClose={hideFailedSnackbar}>
        <Snackbar.Error onClose={hideFailedSnackbar} />
      </Snackbar>
    </>
  );
}
