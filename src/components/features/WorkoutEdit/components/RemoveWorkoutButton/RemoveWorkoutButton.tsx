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
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
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
    setIsRemoving(true);

    onRemove?.()
      .catch(() => {
        setShowFailedSnackbar(true);
      })
      .finally(() => {
        setIsRemoving(false);
      });
  }

  return (
    <>
      <Button onClick={showModal} disabled={isRemoving} color="error" fullWidth>
        Удалить
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
