import React from 'react';
import { List, ListSubheader, Divider } from '@mui/material';
import { TrainingListItem } from './components';
import { trainingProgram } from './constants';

export function TrainingProgram(): JSX.Element {
  return (
    <>
      {trainingProgram.map(({ groupName, exercises }) => (
        <>
          <List subheader={<ListSubheader>{groupName}</ListSubheader>}>
            {exercises.map(({ exerciseName }, index) => (
              <TrainingListItem
                key={index}
                title={exerciseName}
                description="Вес: 50кг, повторений: 10, подходов: 4"
                onClick={() => alert('Погнали!')}
              />
            ))}
          </List>
          <Divider />
        </>
      ))}
    </>
  );
}
