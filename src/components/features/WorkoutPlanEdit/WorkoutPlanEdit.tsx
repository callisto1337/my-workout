import React, { useLayoutEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import urlJoin from 'url-join';
import { child, get, update } from 'firebase/database';
import { dbRef } from 'services/firebase';
import { ROUTES, SNAPSHOT_PATHS } from 'utils/constants';
import { ModalRequestError } from 'components/common';
import { WorkoutPlanForm } from 'components/features';
import { WorkoutPlan } from 'types';

export function WorkoutPlanEdit(): JSX.Element {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>();
  const [loading, setLoading] = useState<boolean>();
  const [showModal, setShowModal] = useState<boolean>();
  const navigate = useNavigate();
  const { id } = useParams();

  function getWorkoutPlan() {
    setLoading(true);

    get(child(dbRef, urlJoin(SNAPSHOT_PATHS.WORKOUT_PLANS, id)))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setWorkoutPlan(snapshot.val());
        }
      })
      .catch(() => {
        setShowModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function updateWorkoutPlan(data: WorkoutPlan) {
    return update(dbRef, {
      [urlJoin(SNAPSHOT_PATHS.WORKOUT_PLANS, id)]: data,
    })
      .then(() => {
        navigate(ROUTES.WORKOUT_PLANS);
      })
      .catch(() => {
        setShowModal(true);
      });
  }

  function onCloseModal() {
    setShowModal(false);
  }

  useLayoutEffect(() => {
    getWorkoutPlan();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <WorkoutPlanForm name={workoutPlan?.name} onSave={updateWorkoutPlan} />
      <ModalRequestError open={showModal} onClose={onCloseModal} />
    </>
  );
}
