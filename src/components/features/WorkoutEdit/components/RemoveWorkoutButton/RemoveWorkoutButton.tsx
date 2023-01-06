import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ModalConfirm, Snackbar } from 'components/common';

interface WorkoutEditRemoveWorkoutButtonProps {
  onRemove: () => Promise<unknown>;
  name: string;
}

export function WorkoutEditRemoveWorkoutButton(
  props: WorkoutEditRemoveWorkoutButtonProps
): JSX.Element {
  const { onRemove, name } = props;
  const [isFailedSnackbarShown, setIsFailedSnackbarShown] =
    useState<boolean>(false);
  const [isConfirmModalShown, setIsConfirmModalShown] = useState<boolean>();

  function hideModal() {
    setIsConfirmModalShown(false);
  }

  function showModal() {
    setIsConfirmModalShown(true);
  }

  function hideFailedSnackbar() {
    setIsFailedSnackbarShown(false);
  }

  function onConfirmHandler() {
    hideModal();

    onRemove?.().catch(() => {
      setIsFailedSnackbarShown(true);
    });
  }

  return (
    <>
      <Button onClick={showModal} color="error" fullWidth>
        Удалить программу
      </Button>
      <ModalConfirm
        open={isConfirmModalShown}
        confirmText={`Вы уверены, что хотите удалить программу "${name}"?`}
        onClose={hideModal}
        onConfirm={onConfirmHandler}
      />
      <Snackbar open={isFailedSnackbarShown} onClose={hideFailedSnackbar}>
        <Snackbar.Error onClose={hideFailedSnackbar}>
          Ошибка удаления программы
        </Snackbar.Error>
      </Snackbar>
    </>
  );
}
