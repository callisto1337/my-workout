import React from 'react';
import {
  Snackbar as MUISnackbar,
  SnackbarProps as MUISnackbarProps,
} from '@mui/material';
import { snackbarStyles } from './Snakbar.styles';

interface SnackbarProps extends MUISnackbarProps {}

export function Snackbar(props: SnackbarProps): JSX.Element {
  const { autoHideDuration = 3000, ...rest } = props;

  return (
    <MUISnackbar
      sx={snackbarStyles}
      autoHideDuration={autoHideDuration}
      {...rest}
    />
  );
}
