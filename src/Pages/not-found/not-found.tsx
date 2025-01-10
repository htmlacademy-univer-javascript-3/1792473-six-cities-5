import React from 'react';
import {NavLink} from 'react-router-dom';
import {AppRoute, DEFAULT_CITY, getCityPath} from '../../utils';

export const NotFoundPage: React.FC = () => (
  <div className="page page--gray page--login">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink className="header__logo-link" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </NavLink>
          </div>
        </div>
      </div>
    </header>

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">404 Not Found</h1>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <NavLink className="locations__item-link" to={getCityPath(DEFAULT_CITY)}>
              <span>{DEFAULT_CITY}</span>
            </NavLink>
          </div>
        </section>
      </div>
    </main>
  </div>
);
