import { atom } from 'recoil';
import { UserState } from './types';

export const userState = atom<UserState>({
  key: 'userState',
  default: null,
});
