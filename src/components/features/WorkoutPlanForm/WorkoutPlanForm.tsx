import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { WorkoutPlan } from 'types';
import { Controller, useForm } from 'react-hook-form';
import { FORM_ERRORS } from 'utils/constants';

interface WorkoutPlanItemProps {
  name?: string;
  onSave?: (data: WorkoutPlan) => Promise<unknown>;
}

export function WorkoutPlanForm(props: WorkoutPlanItemProps): JSX.Element {
  const { name, onSave } = props;
  const [loading, setLoading] = useState<boolean>();
  const { handleSubmit, control } = useForm<WorkoutPlan>({
    defaultValues: {
      name,
    },
  });

  function onSubmit(data: WorkoutPlan) {
    setLoading(true);

    onSave(data).finally(() => {
      setLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item width="100%">
          <Controller
            name="name"
            control={control}
            rules={{ required: FORM_ERRORS.REQUIRED }}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  autoComplete="off"
                  label="Название"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item width="100%">
          <Button variant="contained" type="submit" disabled={loading}>
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
