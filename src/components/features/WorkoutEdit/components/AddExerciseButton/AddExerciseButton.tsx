import React, { useState } from 'react';
import {
  Autocomplete,
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

interface WorkoutEditAddExerciseButtonProps {
  onAdd: (plan: WorkoutPlan) => Promise<unknown>;
}

export function WorkoutEditAddExerciseButton(
  props: WorkoutEditAddExerciseButtonProps
): JSX.Element {
  const { onAdd } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFailedSnackbar, setShowFailedSnackbar] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { handleSubmit, control, reset } = useForm<WorkoutExercise>({
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
      .then(() => {
        reset();
      })
      .catch(() => {
        setShowFailedSnackbar(true);
      })
      .finally(() => {
        setIsAdding(false);
      });
  }

  return (
    <>
      <Button
        fullWidth
        onClick={openModal}
        disabled={isAdding}
        variant="contained"
      >
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
              <Grid item width="100%">
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: FORM_ERRORS.REQUIRED }}
                  render={({ field: { onChange }, fieldState }) => {
                    return (
                      <Autocomplete
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Категория"
                            variant="standard"
                            autoComplete="off"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                        options={categories}
                        fullWidth
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Отменить</Button>
            <Button type="submit">Добавить</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar open={showFailedSnackbar} onClose={closeFailedSnackbar}>
        <Snackbar.Error onClose={closeFailedSnackbar}>
          Ошибка добавления упражнения
        </Snackbar.Error>
      </Snackbar>
    </>
  );
}

// TODO temporary
const categories = ['Грудь/Бицепс', 'Спина/Трицепс', 'Плечи/Ноги'];
