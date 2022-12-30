import React, { useState } from 'react';
import { IconButton, TextField, Box, Stack, Alert } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import { FORM_ERRORS } from 'utils/constants';
import { WorkoutPlan } from 'types';
import { Snackbar } from 'components/common';
import {
  inputStyles,
  wrapperStyles,
  iconStyles,
  alertStyles,
  stackStyles,
} from './Input.styles';

interface WorkoutPlanEditInputProps {
  name: string;
  onSubmit: (name: WorkoutPlan['name']) => Promise<unknown>;
}

export function WorkoutPlanEditInput(
  props: WorkoutPlanEditInputProps
): JSX.Element {
  const { name, onSubmit } = props;
  const [showSuccessfulSnackbar, setShowSuccessfulSnackbar] =
    useState<boolean>(false);
  const [showFailedSnackbar, setShowFailedSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();
  const { handleSubmit, control } = useForm<WorkoutPlan>({
    defaultValues: {
      name,
    },
  });

  function onSubmitHandler(data: Pick<WorkoutPlan, 'name'>) {
    setLoading(true);

    onSubmit(data.name)
      .then(() => {
        setShowSuccessfulSnackbar(true);
      })
      .catch(() => {
        setShowFailedSnackbar(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function closeSuccessfulSnackbar() {
    setShowSuccessfulSnackbar(false);
  }

  function closeFailedSnackbar() {
    setShowFailedSnackbar(false);
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
                  disabled={loading}
                  {...field}
                />
              );
            }}
          />
          <IconButton sx={iconStyles} type="submit" disabled={loading}>
            <SaveIcon />
          </IconButton>
        </Box>
      </form>
      <Stack sx={stackStyles}>
        <Snackbar
          open={showSuccessfulSnackbar}
          onClose={closeSuccessfulSnackbar}
        >
          <Alert
            onClose={closeSuccessfulSnackbar}
            severity="success"
            variant="outlined"
            sx={alertStyles}
          >
            Название успешно изменено
          </Alert>
        </Snackbar>
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
      </Stack>
    </>
  );
}
