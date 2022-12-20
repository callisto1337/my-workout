import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import { auth } from 'services/firebase';
import { ModalRequestError } from 'components/common';
import { containerStyles } from './Auth.styles';

const provider = new GoogleAuthProvider();

export function Auth(): JSX.Element {
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();

  function onCloseModal() {
    setShowErrorModal(false);
  }

  function signInHandler() {
    setLoading(true);

    signInWithRedirect(auth, provider)
      .catch(() => {
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
      <ModalRequestError open={showErrorModal} onClose={onCloseModal} />
    </>
  );
}
