import React from 'react';
import { BaseTemplate } from 'components/templates';
import { Exercise } from 'components/features';
import { ROUTES_TITLES } from 'utils/constants';

export function ExercisePage(): JSX.Element {
  return (
    <BaseTemplate title={ROUTES_TITLES.EXERCISE}>
      <BaseTemplate.Content>
        <Exercise />
      </BaseTemplate.Content>
    </BaseTemplate>
  );
}
