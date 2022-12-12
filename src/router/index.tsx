import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {
  WorkoutPage,
  ExercisePage,
  AuthPage,
  SettingsPage,
  WorkoutPlansPage,
} from 'components/pages';
import { App } from 'components/common';
import { ROUTES } from 'utils/constants';

const { PUBLIC_PATH } = process.env;

export const router = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          path: ROUTES.AUTH,
          element: <AuthPage />,
        },
        {
          path: ROUTES.EXERCISE,
          element: <ExercisePage />,
        },
        {
          path: ROUTES.SETTINGS,
          element: <SettingsPage />,
        },
        {
          path: ROUTES.WORKOUT,
          element: <WorkoutPage />,
        },
        {
          path: ROUTES.WORKOUT_PLANS,
          element: <WorkoutPlansPage />,
        },
        {
          path: ROUTES.ANY,
          element: <h1>404</h1>,
        },
      ],
    },
  ],
  {
    basename: PUBLIC_PATH,
  }
);
