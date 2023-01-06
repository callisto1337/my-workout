import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import { auth } from 'services/firebase';
import { Snackbar } from 'components/common';
import { containerStyles } from './Auth.styles';

const provider = new GoogleAuthProvider();

export function Auth(): JSX.Element {
  const [isFailedSnackbarShown, setIsFailedSnackbarShown] =
    useState<boolean>(false);

  function hideSnackbar() {
    setIsFailedSnackbarShown(false);
  }

  function signInHandler() {
    signInWithRedirect(auth, provider).catch(() => {
      setIsFailedSnackbarShown(true);
    });
  }

  return (
    <>
      <Box sx={containerStyles}>
        <Button
          size="large"
          variant="contained"
          endIcon={<GoogleIcon />}
          onClick={signInHandler}
        >
          Войти
        </Button>
      </Box>
      <Snackbar open={isFailedSnackbarShown} onClose={hideSnackbar}>
        <Snackbar.Error onClose={hideSnackbar} />
      </Snackbar>
    </>
  );
}
