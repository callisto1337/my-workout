import { createBrowserRouter } from 'react-router-dom';
import { BaseTemplate } from 'components/templates';
import { TrainingPage, ExercisePage } from 'components/pages';
import React from 'react';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseTemplate />,
    children: [
      {
        path: '',
        element: <TrainingPage />,
      },
      {
        path: 'exercise',
        element: <ExercisePage />,
      },
    ],
  },
  {
    path: '*',
    element: <h1>404</h1>,
  },
]);
