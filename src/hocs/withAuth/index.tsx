import React, { ComponentType, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import cloneDeep from 'lodash/cloneDeep';
import { appLoadingState, userState } from 'state';
import { AppLoader } from 'components/common';
import { auth } from 'services/firebase';

export function withAuth<P>(Component: ComponentType<P>): ComponentType<P> {
  return (props: P) => {
    const [appLoading, setAppLoading] = useRecoilState(appLoadingState);
    const setUser = useSetRecoilState(userState);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setUser(cloneDeep(user));
        setAppLoading(false);
      });
    }, []);

    if (appLoading) {
      return <AppLoader />;
    }

    return <Component {...props} />;
  };
}
