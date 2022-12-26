import React from 'react';
import { Workout } from 'components/features';
import { BaseTemplate } from 'components/templates';
import { ROUTES_TITLES } from 'utils/constants';

export function WorkoutPage(): JSX.Element {
  return (
    <BaseTemplate title={ROUTES_TITLES.WORKOUT}>
      <Workout />
    </BaseTemplate>
  );
}
