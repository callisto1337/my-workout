import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import { auth } from 'services/firebase';
import { containerStyles } from './AuthPage.styles';

const provider = new GoogleAuthProvider();

export function AuthPage(): JSX.Element {
  const [loading, setLoading] = useState<boolean>();

  function signInHandler() {
    setLoading(true);
    signInWithRedirect(auth, provider);
  }

  return (
    <Box sx={containerStyles}>
      <Button
        disabled={loading}
        variant="contained"
        endIcon={<GoogleIcon />}
        onClick={signInHandler}
      >
        Войти
      </Button>
    </Box>
  );
}
