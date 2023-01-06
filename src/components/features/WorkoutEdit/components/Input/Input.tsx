import React, { useState } from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import { FORM_ERRORS } from 'utils/constants';
import { WorkoutPlan } from 'types';
import { Snackbar } from 'components/common';
import { inputStyles, wrapperStyles, iconStyles } from './Input.styles';

interface WorkoutEditInputProps {
  name: string;
  onSubmit: (name: WorkoutPlan['name']) => Promise<unknown>;
}

export function WorkoutEditInput(props: WorkoutEditInputProps): JSX.Element {
  const { name, onSubmit } = props;
  const [isSuccessfulSnackbarShown, setIsSuccessfulSnackbarShown] =
    useState<boolean>(false);
  const [isFailedSnackbarShown, setIsFailedSnackbarShown] =
    useState<boolean>(false);
  const { handleSubmit, control } = useForm<WorkoutPlan>({
    defaultValues: {
      name,
    },
  });

  function onSubmitHandler(data: Pick<WorkoutPlan, 'name'>) {
    onSubmit(data.name)
      .then(() => {
        setIsSuccessfulSnackbarShown(true);
      })
      .catch(() => {
        setIsFailedSnackbarShown(true);
      });
  }

  function hideSuccessfulSnackbar() {
    setIsSuccessfulSnackbarShown(false);
  }

  function hideFailedSnackbar() {
    setIsFailedSnackbarShown(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box sx={wrapperStyles}>
          <Controller
            name="name"
            control={control}
            rules={{ required: FORM_ERRORS.REQUIRED }}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  size="small"
                  sx={inputStyles}
                  autoComplete="off"
                  label="Название"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              );
            }}
          />
          <IconButton sx={iconStyles} type="submit">
            <SaveIcon />
          </IconButton>
        </Box>
      </form>
      <Snackbar
        open={isSuccessfulSnackbarShown}
        onClose={hideSuccessfulSnackbar}
      >
        <Snackbar.Success onClose={hideSuccessfulSnackbar}>
          Название успешно изменено
        </Snackbar.Success>
      </Snackbar>
      <Snackbar open={isFailedSnackbarShown} onClose={hideFailedSnackbar}>
        <Snackbar.Error onClose={hideFailedSnackbar}>
          Ошибка изменения названия
        </Snackbar.Error>
      </Snackbar>
    </>
  );
}
