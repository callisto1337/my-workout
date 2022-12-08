import React from 'react';
import { Box } from '@mui/material';
import { containerStyles } from './Content.styles';

interface ContentWrapperProps {
  children?: React.ReactNode;
}

export function BaseTemplateContent(props: ContentWrapperProps): JSX.Element {
  const { children } = props;

  return <Box sx={containerStyles}>{children}</Box>;
}
