import React from 'react';
import { BaseTemplate } from 'components/templates';
import { WorkoutPlans } from 'components/features';
import { ROUTES_TITLES } from 'utils/constants';

export function WorkoutPlansPage(): JSX.Element {
  return (
    <BaseTemplate title={ROUTES_TITLES.WORKOUT_PLANS}>
      <WorkoutPlans />
    </BaseTemplate>
  );
}
