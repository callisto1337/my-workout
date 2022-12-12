import React from 'react';
import { BaseTemplate } from 'components/templates';
import { Settings } from 'components/features';

export function SettingsPage(): JSX.Element {
  return (
    <BaseTemplate title="Настройки">
      <BaseTemplate.Content>
        <Settings />
      </BaseTemplate.Content>
    </BaseTemplate>
  );
}
