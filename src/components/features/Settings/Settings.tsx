import React, { useState } from 'react';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ModalRequestError } from 'components/common';
import { auth } from 'services/firebase';
import { ROUTES } from 'utils/constants';

export function Settings(): JSX.Element {
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();
  const navigate = useNavigate();

  function onCloseModal() {
    setShowErrorModal(false);
  }

  function onClickHandler() {
    setLoading(true);

    signOut(auth)
      .then(() => {
        navigate(ROUTES.AUTH);
      })
      .catch(() => {
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
      <ModalRequestError open={showErrorModal} onClose={onCloseModal} />
    </>
  );
}
