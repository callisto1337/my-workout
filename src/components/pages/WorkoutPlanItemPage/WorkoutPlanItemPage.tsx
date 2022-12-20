import React from 'react';
import { BaseTemplate } from 'components/templates';
import { WorkoutPlanEdit } from 'components/features';

export function WorkoutPlanItemPage(): JSX.Element {
  return (
    <BaseTemplate title="Редактировать программу">
      <BaseTemplate.Content>
        <WorkoutPlanEdit />
      </BaseTemplate.Content>
    </BaseTemplate>
  );
}
