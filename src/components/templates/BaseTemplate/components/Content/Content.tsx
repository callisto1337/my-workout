import React from 'react';
import { Box } from '@mui/material';

interface ContentWrapperProps {
  children?: React.ReactNode;
}

export function BaseTemplateContent(props: ContentWrapperProps): JSX.Element {
  const { children } = props;

  return <Box sx={{ px: 2 }}>{children}</Box>;
}
