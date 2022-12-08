import { atom } from 'recoil';

export const appLoadingState = atom<boolean>({
  key: 'appState',
  default: true,
});
