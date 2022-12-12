import React from 'react';
import { BaseTemplate } from 'components/templates';
import { Exercise } from 'components/features';

export function ExercisePage(): JSX.Element {
  return (
    <BaseTemplate title="Редактировать">
      <BaseTemplate.Content>
        <Exercise />
      </BaseTemplate.Content>
    </BaseTemplate>
  );
}
