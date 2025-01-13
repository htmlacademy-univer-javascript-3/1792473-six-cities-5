import React, {memo} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../index.tsx';
import {logoutThunk, selectFavorites} from '../store';
import {Spinner} from './spinner.tsx';
import {AppRoute, getLoginPath} from '../utils';

export interface HeaderProps {
  clickableLogo?: boolean;
}

export const HeaderInternal: React.FC<HeaderProps> = ({clickableLogo}) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const {user} = useSelector((state: RootState) => state.auth);
  const loading = useSelector((state: RootState) => state.offers.loading.favoritesLoading);
  const favorites = useSelector(selectFavorites);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  if (user && (loading || !favorites)) {
    return <Spinner/>;
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {clickableLogo ?
              <NavLink className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </NavLink> :
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>}
          </div>
          <nav className="header__nav">
            {user !== null &&
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" style={{
                      borderRadius: '50%',
                      backgroundImage: `url(${user?.avatarUrl ?? 'img/avatar.svg'})`
                    }}
                    >
                    </div>
                    <span className="header__user-name user__name">{user?.email}</span>
                    <span className="header__favorite-count">{favorites?.length ?? 0}</span>
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link">
                    <span className="header__signout" onClick={handleLogout}>Sign out</span>
                  </a>
                </li>
              </ul>}
            {user === null &&
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink
                    className="header__nav-link header__nav-link--profile"
                    to={getLoginPath(location.pathname + location.search)}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"/>
                    <span className="header__login">Sign in</span>
                  </NavLink>
                </li>
              </ul>}
          </nav>
        </div>
      </div>
    </header>
  );
};


export const Header = memo(HeaderInternal);
