import React from 'react';
import {UserDTO} from '../Types/Offer/Offer.ts';
import {Nullable} from 'vitest';

export interface HeaderProps {
  currentUser: Nullable<UserDTO>;
  signIn: (event: React.MouseEvent<HTMLSpanElement>) => void;
  signOut: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

export const Header: React.FC<HeaderProps> = (props) =>
  (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            {props.currentUser !== null &&
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{props.currentUser?.email}</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout" onClick={props.signOut}>Sign out</span>
                  </a>
                </li>
              </ul>}
            {props.currentUser === null &&
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login" onClick={props.signIn}>Sign in</span>
                  </a>
                </li>
              </ul>}
          </nav>
        </div>
      </div>
    </header>
  );
