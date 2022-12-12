import React from 'react';
import { List, ListSubheader, Divider } from '@mui/material';
import { WorkoutListItem } from './components';
import { workout } from './constants';

export function Workout(): JSX.Element {
  return (
    <div>
      {workout.map(({ groupName, exercises }, index) => (
        <React.Fragment key={index}>
          <List subheader={<ListSubheader>{groupName}</ListSubheader>}>
            {exercises.map(({ exerciseName }, index) => (
              <WorkoutListItem
                key={index}
                title={exerciseName}
                description="Вес: 50кг, повторений: 10, подходов: 4"
              />
            ))}
          </List>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
}
