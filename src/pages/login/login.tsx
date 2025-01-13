import React, {useMemo, useState} from 'react';
import {Navigate, NavLink, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../index.tsx';
import {AuthorizationStatus, clearAuthError, loginThunk} from '../../store';
import {ALL_CITY_NAMES, AppRoute, getCityPath, randomChoice} from '../../utils';
import {MessageBox} from '../../components';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {authorizationStatus, error} = useSelector((state: RootState) => state.auth);

  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRegexp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/);
  const passwordRegexp = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d).+$/);
  // у меня не получилось разгадать какая на сервере валидация...
  // пароль "1sф" сервер принимает, а вот "1фs" уже нет, не знаю какой регекс предполагается написать
  const submitDisabled = !(emailRegexp.test(email) && passwordRegexp.test(password));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (submitDisabled) {
      return;
    }
    dispatch(loginThunk({email, password}));
  };

  const handleCloseMessageBox = () => {
    dispatch(clearAuthError());
  };

  const randomCity = useMemo(() => randomChoice(ALL_CITY_NAMES), []);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={searchParams.get('backUrl') ?? AppRoute.Main}/>;
  }

  return (
    <React.Fragment>
      {error && <MessageBox message={'Невалидная комбинация email/пароль'} onClose={handleCloseMessageBox} level="error"/>}
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
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={(event) => handleSubmit(event)}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <button className="login__submit form__submit button" type="submit" disabled={submitDisabled}>Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <NavLink className="locations__item-link" to={getCityPath(randomCity)}>
                  <span>{randomCity}</span>
                </NavLink>
              </div>
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};
