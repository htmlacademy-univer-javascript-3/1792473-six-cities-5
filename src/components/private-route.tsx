import React, {PropsWithChildren} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../index.tsx';
import {AuthorizationStatus} from '../store';
import {getLoginPath} from '../utils';
import {Spinner} from './spinner.tsx';

export interface PrivateRouteProps {
  authRequired?: boolean;
}

export const PrivateRoute: React.FC<PropsWithChildren<PrivateRouteProps>> = (props) => {
  const authorizationStatus = useSelector((state: RootState) => state.auth.authorizationStatus);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const location = useLocation();

  if (isLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner/>;
  }

  return authorizationStatus === AuthorizationStatus.Auth || !props.authRequired ? props.children : <Navigate to={getLoginPath(location.pathname + location.search)}/>;
};
