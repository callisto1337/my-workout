import React from 'react';
import { Workout } from 'components/features';
import { BaseTemplate } from 'components/templates';

export function WorkoutPage(): JSX.Element {
  return (
    <BaseTemplate title="Тренировки">
      <Workout />
    </BaseTemplate>
  );
}
