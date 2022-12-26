import React from 'react';
import { BaseTemplate } from 'components/templates';
import { Settings } from 'components/features';
import { ROUTES_TITLES } from 'utils/constants';

export function SettingsPage(): JSX.Element {
  return (
    <BaseTemplate title={ROUTES_TITLES.SETTINGS}>
      <BaseTemplate.Content>
        <Settings />
      </BaseTemplate.Content>
    </BaseTemplate>
  );
}
