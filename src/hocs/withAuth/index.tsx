import React, { ComponentType, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { appLoadingState, userState } from 'state';
import { AppLoading } from 'components/common';
import { auth } from 'services/firebase';

export function withAuth<P>(Component: ComponentType<P>): ComponentType<P> {
  return (props: P) => {
    const [appLoading, setAppLoading] = useRecoilState(appLoadingState);
    const setUser = useSetRecoilState(userState);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
        setAppLoading(false);
      });
    }, []);

    if (appLoading) {
      return <AppLoading />;
    }

    return <Component {...props} />;
  };
}
