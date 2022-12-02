import React from 'react';
import { MainTemplate } from 'components/templates';
import { WorkoutList } from 'components/features';

export function MainPage(): JSX.Element {
  return (
    <MainTemplate>
      <WorkoutList />
    </MainTemplate>
  );
}
