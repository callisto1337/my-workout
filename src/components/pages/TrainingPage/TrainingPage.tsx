import React from 'react';
import { Training } from 'components/features';
import { BaseTemplate } from 'components/templates';

export function TrainingPage(): JSX.Element {
  return (
    <BaseTemplate title="Тренировки">
      <Training />
    </BaseTemplate>
  );
}
