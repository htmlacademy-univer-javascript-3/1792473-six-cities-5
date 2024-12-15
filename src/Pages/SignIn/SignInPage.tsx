import React from 'react';
import {NavLink} from 'react-router-dom';
import {City} from '../../Mocks/offers.ts';

export interface SignInPageProps {
  defaultCity: City;
}
export const SignInPage: React.FC<SignInPageProps> = (props) => (
  <div className="page page--gray page--login">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink className="header__logo-link" to="/MainPage">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </NavLink>
          </div>
        </div>
      </div>
    </header>

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post">
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required={undefined}/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required={undefined}/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <NavLink className="locations__item-link" to={`/main?city=${props.defaultCity}`}>
              <span>{props.defaultCity}</span>
            </NavLink>
          </div>
        </section>
      </div>
    </main>
  </div>
);
