import React from 'react';
import {City, UserDTO} from '../Types/Offer/Offer.ts';
import {Nullable} from 'vitest';
import {AuthContext} from '../App.tsx';
import {NavLink} from 'react-router-dom';

export interface HeaderProps {
  currentUser: Nullable<UserDTO>;
  favouritesCount: number;
  // signIn: (event: React.MouseEvent<HTMLSpanElement>) => void;
  // signOut: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

export const Header: React.FC<HeaderProps> = (props) =>
  (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink className="header__logo-link header__logo-link--active" to={'/'}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </NavLink>
          </div>
          <nav className="header__nav">
            {props.currentUser !== null &&
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink className="header__nav-link header__nav-link--profile" to="/favourites">
                    <div className="header__avatar-wrapper user__avatar-wrapper" style={{borderRadius: '50%', backgroundImage: `url(${props.currentUser?.avatarImagePath ?? 'img/avatar.svg'})`}}>
                    </div>
                    <span className="header__user-name user__name">{props.currentUser?.email}</span>
                    <span className="header__favorite-count">{props.favouritesCount}</span>
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink className="header__nav-link" to="/login">
                    {/*<span className="header__signout" onClick={props.signOut} style={{cursor: 'pointer'}}>Sign out</span>*/}
                    <span className="header__signout">Sign out</span>
                  </NavLink>
                </li>
              </ul>}
            {props.currentUser === null &&
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink className="header__nav-link header__nav-link--profile" to="/login">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {/*<span className="header__login" onClick={props.signIn} style={{cursor: 'pointer'}}>Sign in</span>*/}
                    <span className="header__login">Sign in</span>
                  </NavLink>
                </li>
              </ul>}
          </nav>
        </div>
      </div>
    </header>
  );

export const AuthorizedHeader: React.FC = () => {
  const auth = React.useContext(AuthContext);
  // const signIn = (e: React.MouseEvent<HTMLSpanElement>) => {
  //   e.preventDefault();
  //   auth?.signIn();
  // };
  // const signOut = (e: React.MouseEvent<HTMLSpanElement>) => {
  //   e.preventDefault();
  //   auth?.signOut();
  // };
  const favs = Object.keys(auth?.currentUser?.favourites ?? {}).map((x) => auth?.currentUser?.favourites[x as City]?.length ?? 0);
  const favCount = favs.length === 0 ? 0 : favs.reduce((a, b) => a + b);
  return (
    // <Header currentUser={auth?.currentUser} favouritesCount={favCount} signIn={signIn} signOut={signOut}/>
    <Header currentUser={auth?.currentUser} favouritesCount={favCount}/>
  );
};
