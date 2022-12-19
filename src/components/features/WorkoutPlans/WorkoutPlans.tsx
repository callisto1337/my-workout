import React, { useLayoutEffect, useState } from 'react';
import {
  List,
  Box,
  ListItem,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import toArray from 'lodash/toArray';
import { child, get, ref } from 'firebase/database';
import { WorkoutPlansModal } from './components';
import { WorkoutPlan } from 'types';
import { db } from 'services/firebase';
import { SNAPSHOT_PATHS } from 'utils/constants';
import { buttonWrapperStyles } from './WorkoutPlans.styles';

export function WorkoutPlans(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>();
  const [isLoading, setIsLoading] = useState<boolean>();

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  function fetchWorkoutPlans(): void {
    setIsLoading(true);

    const dbRef = ref(db);

    get(child(dbRef, SNAPSHOT_PATHS.WORKOUT_PLANS))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setWorkoutPlans(toArray(snapshot.val()));
        } else {
          setWorkoutPlans([]);
        }
      })
      .catch((error) => {
        // TODO modal with error/retry
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useLayoutEffect(() => {
    fetchWorkoutPlans();
  }, []);

  function renderWorkoutPlans(): JSX.Element {
    if (workoutPlans?.length) {
      return (
        <List>
          {workoutPlans.map((plan, index) => (
            <ListItem key={index} button>
              {plan.name}
            </ListItem>
          ))}
        </List>
      );
    }

    // TODO plug for empty result
    return <Typography>Пусто!</Typography>;
  }

  if (isLoading) {
    // TODO centered spinner
    return <CircularProgress />;
  }

  return (
    <div>
      {renderWorkoutPlans()}
      <Box sx={buttonWrapperStyles}>
        <Button variant="contained" onClick={openModal}>
          Добавить тренировку
        </Button>
      </Box>
      {/* TODO use common modal for errors */}
      <WorkoutPlansModal open={showModal} closeModal={closeModal} />
    </div>
  );
}
