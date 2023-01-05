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
  const [showFailedSnackbar, setShowFailedSnackbar] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>();

  function closeModal() {
    setShowConfirmModal(false);
  }

  function showModal() {
    setShowConfirmModal(true);
  }

  function closeFailedSnackbar() {
    setShowFailedSnackbar(false);
  }

  function onConfirmHandler() {
    closeModal();

    onRemove?.().catch(() => {
      setShowFailedSnackbar(true);
    });
  }

  return (
    <>
      <Button onClick={showModal} color="error" fullWidth>
        Удалить программу
      </Button>
      <ModalConfirm
        open={showConfirmModal}
        confirmText={`Вы уверены, что хотите удалить программу "${name}"?`}
        onClose={closeModal}
        onConfirm={onConfirmHandler}
      />
      <Snackbar open={showFailedSnackbar} onClose={closeFailedSnackbar}>
        <Snackbar.Error onClose={closeFailedSnackbar}>
          Ошибка удаления программы
        </Snackbar.Error>
      </Snackbar>
    </>
  );
}
