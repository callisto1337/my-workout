import React from 'react';
import { BaseTemplate } from 'components/templates';
import { Box, TextField, Grid, Button } from '@mui/material';

export function ExercisePage(): JSX.Element {
  return (
    <BaseTemplate title="Редактировать">
      <BaseTemplate.ContentWrapper>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item width="33.3%">
              <TextField name="weight" label="Вес" fullWidth />
            </Grid>
            <Grid item width="33.3%">
              <TextField name="repeats" label="Повторы" fullWidth />
            </Grid>
            <Grid item width="33.3%">
              <TextField name="sets" label="Подходы" fullWidth />
            </Grid>
            <Grid item width="100%">
              <TextField name="comment" label="Комментарий" fullWidth />
            </Grid>
            <Grid item width="100%">
              <Box justifyContent="flex-end" display="flex">
                <Button variant="contained">Сохранить</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </BaseTemplate.ContentWrapper>
    </BaseTemplate>
  );
}
