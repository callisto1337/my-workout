import React from 'react';
import {
  Typography,
  Breadcrumbs as MUIBreadcrumbs,
  SxProps,
} from '@mui/material';
import { RouterLink, RouterLinkProps } from 'components/common';
import { breadcrumbItemStyles } from './Breadcrumbs.styles';

interface BreadcrumbsItem extends Pick<RouterLinkProps, 'children' | 'to'> {
  active?: boolean;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbsItem[];
  sx?: SxProps;
}

export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element {
  const { items, sx } = props;

  return (
    <MUIBreadcrumbs sx={sx}>
      {items?.map(({ to, active, children }, index) => {
        if (active) {
          return (
            <Typography sx={breadcrumbItemStyles} key={index}>
              {children}
            </Typography>
          );
        }

        return (
          <RouterLink to={to} key={index}>
            {children}
          </RouterLink>
        );
      })}
    </MUIBreadcrumbs>
  );
}
