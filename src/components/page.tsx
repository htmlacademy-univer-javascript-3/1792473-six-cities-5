import React, {PropsWithChildren} from 'react';
import {PrivateRoute} from './private-route.tsx';

export interface PageProps {
  authRequired?: boolean;
  header?: React.ReactNode;
  navBar?: React.ReactNode;
  footer?: React.ReactNode;
  pageClassNames?: string;
  contentClassNames?: string;
}

export const Page: React.FC<PropsWithChildren<PageProps>> = (props) =>
  (
    <PrivateRoute authRequired={props.authRequired}>
      <div className={`page ${props.pageClassNames ?? ''}`}>
        {props.header}
        {props.navBar}
        <main className={`page__main ${props.contentClassNames ?? ''}`}>
          {props.children}
        </main>
        {props.footer}
      </div>
    </PrivateRoute>
  );
