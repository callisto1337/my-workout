import React from 'react';
import { Outlet } from 'react-router-dom';
import { withAuth } from 'hocs';
import { useAuthRedirect } from 'hooks';

function AppComponent(): JSX.Element {
  useAuthRedirect();

  return <Outlet />;
}

export const App = withAuth(AppComponent);
