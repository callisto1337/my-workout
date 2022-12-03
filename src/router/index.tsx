import { createBrowserRouter } from 'react-router-dom';
import { TrainingPage } from 'components/pages';
import React from 'react';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TrainingPage />,
  },
  {
    path: '*',
    element: <h1>Test route</h1>,
  },
]);
