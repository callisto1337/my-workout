import React from 'react';
import {
  Snackbar as MUISnackbar,
  SnackbarProps as MUISnackbarProps,
  Box,
} from '@mui/material';
import { SnackbarError, SnackbarSuccess } from './components';
import { snackbarStyles, contentWrapperStyles } from './Snackbar.styles';

interface SnackbarProps extends MUISnackbarProps {}

export function Snackbar(props: SnackbarProps): JSX.Element {
  const { autoHideDuration = 3000, children, ...rest } = props;

  return (
    <MUISnackbar
      sx={snackbarStyles}
      autoHideDuration={autoHideDuration}
      {...rest}
    >
      <Box sx={contentWrapperStyles}>{children}</Box>
    </MUISnackbar>
  );
}

Snackbar.Error = SnackbarError;
Snackbar.Success = SnackbarSuccess;
