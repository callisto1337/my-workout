import React, { useState } from 'react';
import {
  Button,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Typography,
} from '@mui/material';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import { auth } from 'services/firebase';
import { containerStyles } from './Auth.styles';

const provider = new GoogleAuthProvider();

export function Auth(): JSX.Element {
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  function onCloseModal() {
    setShowErrorModal(false);
  }

  function signInHandler() {
    setLoading(true);
    setError(null);

    signInWithRedirect(auth, provider)
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
      <Box sx={containerStyles}>
        <Button
          size="large"
          disabled={loading}
          variant="contained"
          endIcon={<GoogleIcon />}
          onClick={signInHandler}
        >
          Войти
        </Button>
      </Box>
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
