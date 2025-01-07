import React, {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../index.tsx';
import {AuthorizationStatus} from '../Redux/Auth.ts';

export interface PrivateRouteProps {
  authRequired?: boolean;
}

export const PrivateRoute: React.FC<PropsWithChildren<PrivateRouteProps>> = (props) => {
  const authorizationStatus = useSelector((state: RootState) => state.auth.authorizationStatus);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  if (isLoading || authorizationStatus === AuthorizationStatus.UNKNOWN) {
    return <div>Загрузка...</div>;
  }

  return authorizationStatus === AuthorizationStatus.AUTH || !props.authRequired ? props.children : <Navigate to="/login"/>;
};
