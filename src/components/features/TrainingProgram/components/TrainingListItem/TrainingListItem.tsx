import React from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface TrainingListItemProps {
  onClick?: () => void;
  title?: string;
  description?: string;
}

export function TrainingListItem(props: TrainingListItemProps): JSX.Element {
  const { title, description, onClick } = props;

  return (
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
  );
}
