import React from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { RouterLink } from 'components/common';

interface TrainingListItemProps {
  onClick?: () => void;
  title?: string;
  description?: string;
}

export function TrainingListItem(props: TrainingListItemProps): JSX.Element {
  const { title, description, onClick } = props;

  return (
    <RouterLink to="/exercise">
      <ListItem
        button
        onClick={onClick}
        secondaryAction={
          <IconButton edge="end">
            <ArrowForwardIosIcon />
          </IconButton>
        }
      >
        <ListItemText secondary={description} primary={title} />
      </ListItem>
    </RouterLink>
  );
}
