import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import { Navigation } from 'components/features';
import { Breadcrumbs, BreadcrumbsProps } from 'components/common';
import { BaseTemplateContent } from './components/Content';
import {
  containerStyles,
  titleStyles,
  navContainerStyles,
  breadcrumbsStyles,
} from './BaseTemplate.styles';

interface BaseTemplateProps {
  title?: string;
  children?: React.ReactNode;
  breadcrumbs?: BreadcrumbsProps['items'];
}

export function BaseTemplate(props: BaseTemplateProps): JSX.Element {
  const { title, children, breadcrumbs } = props;

  return (
    <Box sx={containerStyles}>
      {title && (
        <>
          <Typography variant="h4" sx={titleStyles}>
            {title}
          </Typography>
          <Divider />
        </>
      )}
      {!!breadcrumbs?.length && (
        <Breadcrumbs sx={breadcrumbsStyles} items={breadcrumbs} />
      )}
      {children}
      <Paper sx={navContainerStyles}>
        <Navigation />
      </Paper>
    </Box>
  );
}

BaseTemplate.Content = BaseTemplateContent;
