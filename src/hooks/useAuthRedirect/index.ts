import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import isNil from 'lodash/isNil';
import { useRecoilValue } from 'recoil';
import { appLoadingState, userState } from 'state';
import { ROUTES } from 'utils/constants';

export function useAuthRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const appLoading = useRecoilValue(appLoadingState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (appLoading) {
      return;
    }

    if (isNil(user)) {
      navigate(ROUTES.AUTH);
    } else if (location.pathname === '/auth') {
      navigate(ROUTES.MAIN);
    }
  }, [appLoading]);
}
