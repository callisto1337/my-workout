import React from 'react';
import { BaseTemplate } from 'components/templates';
import { WorkoutPlans } from 'components/features';

export function WorkoutPlansPage(): JSX.Element {
  return (
    <BaseTemplate title="Программы тренировок">
      <WorkoutPlans />
    </BaseTemplate>
  );
}
