import React, { useLayoutEffect, useState } from 'react';
import urlJoin from 'url-join';
import {
  List,
  Box,
  ListItem,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import isNil from 'lodash/isNil';
import { child, get, DataSnapshot } from 'firebase/database';
import { WorkoutPlansModal } from './components';
import { RouterLink } from 'components/common';
import { WorkoutPlan } from 'types';
import { dbRef } from 'services/firebase';
import { ROUTES, SNAPSHOT_PATHS } from 'utils/constants';
import { buttonWrapperStyles } from './WorkoutPlans.styles';

export function WorkoutPlans(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [workoutPlans, setWorkoutPlans] =
    useState<Record<keyof DataSnapshot, WorkoutPlan>>();
  const [isLoading, setIsLoading] = useState<boolean>();

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  function fetchWorkoutPlans(): void {
    setIsLoading(true);

    get(child(dbRef, SNAPSHOT_PATHS.WORKOUT_PLANS))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setWorkoutPlans(snapshot.val());
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
    if (!isNil(workoutPlans)) {
      const ids = Object.keys(workoutPlans) as (keyof DataSnapshot)[];

      return (
        <List>
          {ids.map((id) => (
            <RouterLink key={id} to={urlJoin(ROUTES.WORKOUT_PLANS, id)}>
              <ListItem button>{workoutPlans[id]?.name}</ListItem>
            </RouterLink>
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
