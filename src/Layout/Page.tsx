import React, {PropsWithChildren} from 'react';
import {AuthorizedContent} from './AuthorizedContent.tsx';

export interface PageProps {
  authRequired?: boolean;
  header?: React.ReactNode;
  navBar?: React.ReactNode;
  footer?: React.ReactNode;
  pageClassNames?: string;
}

export const Page: React.FC<PropsWithChildren<PageProps>> = (props) =>
  (
    <AuthorizedContent authRequired={props.authRequired}>
      {props.header}
      {props.navBar}
      <main className={`page__main ${props.pageClassNames ?? ''}`}>
        {props.children}
      </main>
      {props.footer}
    </AuthorizedContent>
  );
