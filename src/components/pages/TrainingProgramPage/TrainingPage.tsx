import React from 'react';
import { TrainingProgram } from 'components/features';
import { BaseTemplate } from 'components/templates';

export function TrainingPage(): JSX.Element {
  return (
    <BaseTemplate title="Тренировки">
      <TrainingProgram />
    </BaseTemplate>
  );
}
