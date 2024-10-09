import React, {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../App.tsx';

export interface AuthorizedContentProps {
  authRequired?: boolean;
}

export const AuthorizedContent: React.FC<PropsWithChildren<AuthorizedContentProps>> = (props) => {
  const user = React.useContext(AuthContext);
  return props.authRequired && user === null ? <Navigate to="/login"/> : props.children;
};
