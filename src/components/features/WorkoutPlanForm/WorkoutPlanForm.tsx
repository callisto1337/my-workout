import React, { useState } from 'react';
import { Grid, TextField, Button, Divider, FormControl } from '@mui/material';
import { WorkoutPlan } from 'types';
import { Controller, useForm } from 'react-hook-form';
import { FORM_ERRORS } from 'utils/constants';
import { ModalConfirm } from 'components/common/ModalConfirm';
import { formStyles } from './WorkoutPlanForm.styles';

interface WorkoutPlanItemProps {
  name?: string;
  onSubmit?: (data: WorkoutPlan) => Promise<unknown>;
  onRemove?: () => Promise<unknown>;
}

export function WorkoutPlanForm(props: WorkoutPlanItemProps): JSX.Element {
  const { name, onSubmit, onRemove } = props;
  const [loading, setLoading] = useState<boolean>();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>();
  const { handleSubmit, control } = useForm<WorkoutPlan>({
    defaultValues: {
      name,
    },
  });

  function onSubmitHandler(data: WorkoutPlan) {
    setLoading(true);

    onSubmit(data).finally(() => {
      setLoading(false);
    });
  }

  function onRemoveHandler() {
    setShowConfirmModal(false);
    setLoading(true);

    onRemove().finally(() => {
      setLoading(false);
    });
  }

  function onOpenModalHandler() {
    setShowConfirmModal(true);
  }

  function onCloseModalHandler() {
    setShowConfirmModal(false);
  }

  return (
    <>
      <FormControl onSubmit={handleSubmit(onSubmitHandler)} sx={formStyles}>
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
                    disabled={loading}
                    {...field}
                  />
                );
              }}
            />
          </Grid>
          {/*<Grid item width="100%">*/}
          {/*  <Button fullWidth>Добавить упражнение</Button>*/}
          {/*</Grid>*/}
          {/*<Grid item width="100%">*/}
          {/*  <Divider />*/}
          {/*</Grid>*/}
          <Grid item width="100%">
            <Grid container spacing={2}>
              <Grid item width="100%">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  fullWidth
                >
                  Сохранить
                </Button>
              </Grid>
              {onRemoveHandler && (
                <Grid item width="100%">
                  <Button
                    onClick={onOpenModalHandler}
                    variant="contained"
                    disabled={loading}
                    color="error"
                    fullWidth
                  >
                    Удалить
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </FormControl>
      <ModalConfirm
        open={showConfirmModal}
        confirmText={`Вы уверены, что хотите удалить программу "${name}"`}
        onClose={onCloseModalHandler}
        onConfirm={onRemoveHandler}
      />
    </>
  );
}
