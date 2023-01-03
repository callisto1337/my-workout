import React, { useState } from 'react';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from 'components/common';
import { auth } from 'services/firebase';
import { ROUTES } from 'utils/constants';

export function Settings(): JSX.Element {
  const [showErrorSnackbar, setShowErrorSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();
  const navigate = useNavigate();

  function closeSnackbar() {
    setShowErrorSnackbar(false);
  }

  function onClickHandler() {
    setLoading(true);

    signOut(auth)
      .then(() => {
        navigate(ROUTES.AUTH);
      })
      .catch(() => {
        setShowErrorSnackbar(true);
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
        fullWidth
      >
        Выйти
      </Button>
      <Snackbar open={showErrorSnackbar} onClose={closeSnackbar}>
        <Snackbar.Error onClose={closeSnackbar} />
      </Snackbar>
    </>
  );
}
