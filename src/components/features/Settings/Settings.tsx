import React, { useState } from 'react';
import {
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'services/firebase';
import { ROUTES } from 'utils/constants';

export function Settings(): JSX.Element {
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const navigate = useNavigate();

  function onCloseModal() {
    setShowErrorModal(false);
  }

  function onClickHandler() {
    setLoading(true);
    setError(null);

    signOut(auth)
      .then(() => {
        navigate(ROUTES.AUTH);
      })
      .catch((error) => {
        setError(error.message);
        setShowErrorModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={onClickHandler}
        disabled={loading}
      >
        Выйти
      </Button>
      <Dialog open={showErrorModal} onClose={onCloseModal}>
        <DialogTitle>Произошла ошибка</DialogTitle>
        <DialogContent>
          <Typography>Попробуйте повторить попытку</Typography>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModal} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
