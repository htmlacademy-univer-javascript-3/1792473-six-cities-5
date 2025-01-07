import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../index.tsx';
import {fetchFavoritesThunk, selectFavorites} from '../Redux/Offers.ts';
import {Spinner} from '../Components/Spinner.tsx';
import {logoutThunk} from '../Redux/Auth.ts';

export interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: RootState) => state.auth);
  const {isLoading, error} = useSelector((state: RootState) => state.offers);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavoritesThunk());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  if (error) {
    return <div>Ошибка {error}</div>;
  }

  if (user && (isLoading || !favorites)) {
    return <Spinner/>;
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink className="header__logo-link header__logo-link--active" to={'/'}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </NavLink>
          </div>
          <nav className="header__nav">
            {user !== null &&
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink className="header__nav-link header__nav-link--profile" to="/favorites">
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
                  <NavLink className="header__nav-link header__nav-link--profile" to={`/login?backUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`}>
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
