import React from 'react';
import { ref, push, set } from 'firebase/database';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogProps,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FORM_ERRORS } from 'utils/constants';
import { db } from 'services/firebase';
import { SNAPSHOT_PATHS } from 'utils/constants';

interface WorkoutPlansModalProps extends Pick<DialogProps, 'open'> {
  closeModal?: () => void;
}

interface IFormInputs {
  workoutPlanName: string;
}

export function WorkoutPlansModal(props: WorkoutPlansModalProps): JSX.Element {
  const { open, closeModal } = props;

  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      workoutPlanName: '',
    },
  });
  function onSubmit({ workoutPlanName }: IFormInputs): void {
    const workoutPlanRef = ref(db, SNAPSHOT_PATHS.WORKOUT_PLANS);
    const newWorkoutPlanRef = push(workoutPlanRef);

    // TODO need finalize
    set(newWorkoutPlanRef, {
      name: workoutPlanName,
    })
      .then((snapshot) => {
        console.log('snapshot: ', snapshot);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>Добавить программу</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="workoutPlanName"
            control={control}
            rules={{ required: FORM_ERRORS.REQUIRED }}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  autoComplete="off"
                  variant="standard"
                  label="Название"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="submit">
            Добавить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
