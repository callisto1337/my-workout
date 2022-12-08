import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Navigation } from 'components/features';
import { BaseTemplateContent } from './components/Content';
import {
  containerStyles,
  titleStyles,
  navContainerStyles,
} from './BaseTemplate.styles';

interface BaseTemplateProps {
  title?: string;
  children?: React.ReactNode;
}

export function BaseTemplate(props: BaseTemplateProps): JSX.Element {
  const { title, children } = props;

  return (
    <Box sx={containerStyles}>
      {title && (
        <Typography variant="h4" sx={titleStyles}>
          {title}
        </Typography>
      )}
      {children}
      <Paper sx={navContainerStyles}>
        <Navigation />
      </Paper>
    </Box>
  );
}

BaseTemplate.Content = BaseTemplateContent;
