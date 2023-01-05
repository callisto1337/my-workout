import React, { useState } from 'react';
import {
  Box,
  SxProps,
  List,
  ListItem,
  ListSubheader,
  Divider,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { WorkoutExercise } from 'types';
import { Snackbar } from 'components/common';

interface WorkoutEditExercisesListProps {
  exercises?: WorkoutExercise[];
  sx?: SxProps;
  canRemove?: boolean;
  onRemove?: (id: number) => Promise<unknown>;
}

export function ExercisesList(
  props: WorkoutEditExercisesListProps
): JSX.Element {
  const { exercises, sx, canRemove, onRemove } = props;
  const [isFailedSnackbarVisible, setIsFailedSnackbarVisible] =
    useState<boolean>(false);
  const exercisesByCategories = exercises?.reduce<
    Record<WorkoutExercise['category'], Record<number, WorkoutExercise>>
  >((accum, exercise, index) => {
    const { category } = exercise;
    const prevExercises = {
      ...(accum[category] ? accum[category] : {}),
    };

    accum[category] = { ...prevExercises, [index]: exercise };

    return accum;
  }, {});
  const categoriesList = Object.keys(exercisesByCategories || [])
    .sort()
    .reverse();

  function hideFailedSnackbar() {
    setIsFailedSnackbarVisible(false);
  }

  function showFailedSnackbar() {
    setIsFailedSnackbarVisible(true);
  }

  function onClickHandler(id: number, name: string) {
    const conf = confirm(`Вы уверены, что хотите удалить упражнение ${name}?`);

    if (conf) {
      onRemove?.(id).catch(() => {
        showFailedSnackbar();
      });
    }
  }

  return (
    <>
      <Box sx={sx}>
        {categoriesList.map((category, index) => {
          const exercises = exercisesByCategories[category];

          return (
            <React.Fragment key={category}>
              {index > 0 && <Divider />}
              <List
                subheader={
                  <ListSubheader disableGutters>{category}</ListSubheader>
                }
              >
                {Object.keys(exercises).map((exerciseId) => {
                  const id = Number(exerciseId);
                  const name = exercises[id].name;

                  return (
                    <ListItem
                      disableGutters
                      key={exerciseId}
                      secondaryAction={
                        canRemove && (
                          <IconButton onClick={() => onClickHandler(id, name)}>
                            <DeleteIcon />
                          </IconButton>
                        )
                      }
                    >
                      - {name}
                    </ListItem>
                  );
                })}
              </List>
            </React.Fragment>
          );
        })}
      </Box>
      <Snackbar open={isFailedSnackbarVisible} onClose={hideFailedSnackbar}>
        <Snackbar.Error onClose={hideFailedSnackbar}>
          Ошибка удаления упражнения
        </Snackbar.Error>
      </Snackbar>
    </>
  );
}
