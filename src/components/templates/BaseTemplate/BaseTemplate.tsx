import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Navigation } from 'components/features';
import { ContentWrapper } from './components/ContentWrapper';

interface BaseTemplateProps {
  title?: string;
  children?: React.ReactNode;
}

export function BaseTemplate(props: BaseTemplateProps): JSX.Element {
  const { title, children } = props;

  return (
    <Box sx={{ pb: 7 }}>
      {title && (
        <Typography variant="h4" sx={{ m: 2 }}>
          {title}
        </Typography>
      )}
      {children}
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <Navigation />
      </Paper>
    </Box>
  );
}

BaseTemplate.ContentWrapper = ContentWrapper;
