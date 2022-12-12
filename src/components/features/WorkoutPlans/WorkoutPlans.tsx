import React from 'react';
import { List, Box, ListItem, Button } from '@mui/material';
import { buttonWrapperStyles } from './WorkoutPlans.styles';

const workoutPlans = [
  {
    name: 'Моя тренировка',
  },
];

export function WorkoutPlans(): JSX.Element {
  return (
    <div>
      <List>
        {workoutPlans.map((plan, index) => (
          <ListItem key={index} button>
            {plan.name}
          </ListItem>
        ))}
      </List>
      <Box sx={buttonWrapperStyles}>
        <Button variant="contained">Добавить тренировку</Button>
      </Box>
    </div>
  );
}
