import React, { forwardRef } from 'react';
import { Slide, SlideProps } from '@mui/material';
import { TransitionProps as MUITransitionProps } from '@mui/material/transitions';

interface TransitionProps
  extends MUITransitionProps,
    Pick<SlideProps, 'direction'> {
  children?: React.ReactElement;
}

export function TransitionComponent(
  props: TransitionProps,
  ref: React.Ref<unknown>
): JSX.Element {
  const { children, ...rest } = props;

  return (
    <Slide ref={ref} {...rest}>
      {children}
    </Slide>
  );
}

export const Transition = forwardRef(TransitionComponent);
