import React, {PropsWithChildren} from 'react';
import {PrivateRoute} from './PrivateRoute.tsx';

export interface PageProps {
  authRequired?: boolean;
  header?: React.ReactNode;
  navBar?: React.ReactNode;
  footer?: React.ReactNode;
  pageClassNames?: string;
}

export const Page: React.FC<PropsWithChildren<PageProps>> = (props) =>
  (
    <PrivateRoute authRequired={props.authRequired}>
      {props.header}
      {props.navBar}
      <main className={`page__main ${props.pageClassNames ?? ''}`}>
        {props.children}
      </main>
      {props.footer}
    </PrivateRoute>
  );
