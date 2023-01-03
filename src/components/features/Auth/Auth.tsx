import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import { auth } from 'services/firebase';
import { Snackbar } from 'components/common';
import { containerStyles } from './Auth.styles';

const provider = new GoogleAuthProvider();

export function Auth(): JSX.Element {
  const [showErrorSnackbar, setShowErrorSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();

  function closeSnackbar() {
    setShowErrorSnackbar(false);
  }

  function signInHandler() {
    setLoading(true);

    signInWithRedirect(auth, provider)
      .catch(() => {
        setShowErrorSnackbar(true);
      })
      .finally(() => {
        setShowErrorSnackbar(true);
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
      <Snackbar open={showErrorSnackbar} onClose={closeSnackbar}>
        <Snackbar.Error onClose={closeSnackbar} />
      </Snackbar>
    </>
  );
}
