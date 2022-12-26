import React from 'react';
import { Link, useLocation, LinkProps } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import { ROUTES } from 'utils/constants';

interface RouteAction
  extends Pick<BottomNavigationActionProps, 'label' | 'icon'>,
    Pick<LinkProps, 'to'> {}

const routes: RouteAction[] = [
  {
    to: ROUTES.WORKOUT,
    label: 'Тренировка',
    icon: <FitnessCenterIcon />,
  },
  {
    to: ROUTES.WORKOUT_PLANS,
    label: 'Программы',
    icon: <FormatListBulletedIcon />,
  },
  {
    to: ROUTES.SETTINGS,
    label: 'Настройки',
    icon: <SettingsIcon />,
  },
];

export function Navigation(): JSX.Element {
  const location = useLocation();

  function getRouteIndex(): number {
    return routes.findIndex(({ to }) => {
      return new RegExp(`^${to}(/.+)*$`).test(location.pathname);
    });
  }

  return (
    <BottomNavigation showLabels value={getRouteIndex()}>
      {routes.map((route, index) => (
        <BottomNavigationAction component={Link} key={index} {...route} />
      ))}
    </BottomNavigation>
  );
}
