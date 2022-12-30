import React, { useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { WorkoutExercise, WorkoutPlan } from 'types';
import { FORM_ERRORS } from 'utils/constants';
import { Snackbar } from 'components/common';
import { alertStyles } from './AddButton.styles';

interface WorkoutPlanEditAddButtonProps {
  onAdd: (plan: WorkoutPlan) => Promise<unknown>;
}

export function WorkoutPlanEditAddButton(
  props: WorkoutPlanEditAddButtonProps
): JSX.Element {
  const { onAdd } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFailedSnackbar, setShowFailedSnackbar] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<WorkoutExercise>({
    defaultValues: {
      name: '',
      category: '',
    },
  });

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function closeFailedSnackbar() {
    setShowFailedSnackbar(false);
  }

  function onSubmit(data: WorkoutPlan) {
    closeModal();
    setIsAdding(true);

    onAdd?.(data)
      .catch(() => {
        setShowFailedSnackbar(true);
      })
      .finally(() => {
        setIsAdding(false);
      });
  }

  return (
    <>
      <Button fullWidth onClick={openModal} disabled={isAdding}>
        Добавить
      </Button>
      <Dialog open={showModal} onClose={closeModal}>
        <DialogTitle>Добавить упражнение</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid spacing={2} container>
              <Grid item width="100%">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: FORM_ERRORS.REQUIRED }}
                  render={({ field, fieldState }) => {
                    return (
                      <TextField
                        required
                        fullWidth
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
              </Grid>
              {/*<Grid item width="100%">*/}
              {/*  <Controller*/}
              {/*    name="category"*/}
              {/*    control={control}*/}
              {/*    rules={{ required: FORM_ERRORS.REQUIRED }}*/}
              {/*    render={({ field, fieldState }) => {*/}
              {/*      return (*/}
              {/*        <TextField*/}
              {/*          fullWidth*/}
              {/*          autoComplete="off"*/}
              {/*          variant="standard"*/}
              {/*          label="Название"*/}
              {/*          error={!!fieldState.error}*/}
              {/*          helperText={fieldState.error?.message}*/}
              {/*          {...field}*/}
              {/*        />*/}
              {/*      );*/}
              {/*    }}*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Отменить</Button>
            <Button type="submit">Добавить</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar open={showFailedSnackbar} onClose={closeFailedSnackbar}>
        <Alert
          onClose={closeFailedSnackbar}
          severity="error"
          variant="outlined"
          sx={alertStyles}
        >
          Ошибка изменения названия
        </Alert>
      </Snackbar>
    </>
  );
}
