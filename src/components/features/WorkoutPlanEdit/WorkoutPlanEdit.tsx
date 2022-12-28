import React, { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import urlJoin from 'url-join';
import { child, get, update, set } from 'firebase/database';
import { dbRef } from 'services/firebase';
import { ROUTES, SNAPSHOT_PATHS } from 'utils/constants';
import { ModalRequestError, CenteredSpinner } from 'components/common';
import { WorkoutPlanForm } from 'components/features';
import { WorkoutPlan } from 'types';

export function WorkoutPlanEdit(): JSX.Element {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>();
  const [loading, setLoading] = useState<boolean>();
  const [showModal, setShowModal] = useState<boolean>();
  const navigate = useNavigate();
  const { id } = useParams();
  const workoutPlanPath = urlJoin(SNAPSHOT_PATHS.WORKOUT_PLANS, id);

  function getWorkoutPlan() {
    setLoading(true);

    get(child(dbRef, workoutPlanPath))
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
      [workoutPlanPath]: data,
    })
      .then(() => {
        navigate(ROUTES.WORKOUT_PLANS);
      })
      .catch(() => {
        setShowModal(true);
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

  function onCloseModal() {
    setShowModal(false);
  }

  useLayoutEffect(() => {
    getWorkoutPlan();
  }, []);

  if (loading) {
    return <CenteredSpinner />;
  }

  return (
    <>
      <WorkoutPlanForm
        name={workoutPlan?.name}
        onSubmit={updateWorkoutPlan}
        onRemove={removeWorkoutPlan}
      />
      <ModalRequestError open={showModal} onClose={onCloseModal} />
    </>
  );
}
