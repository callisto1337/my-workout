import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Dialog, DialogProps, Transition } from 'components/common';
import { titleStyles } from './Dialog.styles';

interface ExerciseListDialogProps extends Omit<DialogProps, 'onClose'> {
  onClose?: () => void;
  name?: string;
}

export function ExercisesListDialog(
  props: ExerciseListDialogProps
): JSX.Element {
  const { open, onClose, name, children } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      TransitionComponent={Transition}
      TransitionProps={{
        direction: 'up',
      }}
    >
      <AppBar>
        <Toolbar>
          <IconButton edge="start" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={titleStyles} variant="subtitle1" component="div">
            {name}
          </Typography>
          <IconButton edge="end" onClick={onClose}>
            <CheckIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
}
