import { createBrowserRouter } from 'react-router-dom';
import { TrainingPage, ExercisePage } from 'components/pages';
import React from 'react';

export const router = createBrowserRouter([
  {
    path: '/exercise',
    element: <ExercisePage />,
  },
  {
    path: '/',
    element: <TrainingPage />,
  },
  {
    path: '*',
    element: <h1>404</h1>,
  },
]);
