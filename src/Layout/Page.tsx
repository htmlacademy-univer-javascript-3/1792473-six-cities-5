import React, {PropsWithChildren} from 'react';
import {AuthorizedContent} from './AuthorizedContent.tsx';

export interface PageProps {
  authRequired?: boolean;
  navBar?: React.ReactNode;
  footer?: React.ReactNode;
  pageClassNames?: string;
}

export const Page: React.FC<PropsWithChildren<PageProps>> = (props) =>
  (
    <AuthorizedContent authRequired={props.authRequired}>
      <div>
        {props.navBar}
        <div className="page">
          <main className={`page__main ${props.pageClassNames ?? ''}`}>
            {props.children}
          </main>
          {props.footer}
        </div>
      </div>
    </AuthorizedContent>
  );
