import React, { useState } from 'react';
import { Alert, Button } from '@mui/material';
import { ModalConfirm, Snackbar } from 'components/common';
import { alertStyles } from './RemoveButton.styles';

interface WorkoutEditRemoveButtonProps {
  onRemove: () => Promise<unknown>;
  name: string;
}

export function WorkoutEditRemoveButton(
  props: WorkoutEditRemoveButtonProps
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
      <Button
        onClick={showModal}
        variant="contained"
        disabled={isRemoving}
        color="error"
        fullWidth
      >
        Удалить
      </Button>
      <ModalConfirm
        open={showConfirmModal}
        confirmText={`Вы уверены, что хотите удалить программу "${name}"?`}
        onClose={closeModal}
        onConfirm={onConfirmHandler}
      />
      <Snackbar open={showFailedSnackbar} onClose={closeFailedSnackbar}>
        <Alert
          onClose={closeFailedSnackbar}
          severity="error"
          variant="outlined"
          sx={alertStyles}
        >
          Ошибка изменения названия
        </Alert>
      </Snackbar>
    </>
  );
}
