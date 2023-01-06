import React from 'react';
import {
  Dialog as MUIDialog,
  DialogProps as MUIDialogProps,
  SlideProps,
} from '@mui/material';

export interface DialogProps extends Omit<MUIDialogProps, 'TransitionProps'> {
  TransitionProps?: MUIDialogProps['TransitionProps'] &
    Pick<SlideProps, 'direction'>;
}

export function Dialog(props: DialogProps): JSX.Element {
  return <MUIDialog {...props} />;
}
