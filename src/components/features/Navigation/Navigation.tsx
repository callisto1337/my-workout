import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SettingsIcon from '@mui/icons-material/Settings';
import { ROUTES } from 'utils/constants';

export function Navigation(): JSX.Element {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        component={Link}
        to={ROUTES.MAIN}
        value={ROUTES.MAIN}
        label="Тренировка"
        icon={<FitnessCenterIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={ROUTES.SETTINGS}
        value={ROUTES.SETTINGS}
        label="Настройки"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}
