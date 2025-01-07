import React from 'react';
import {Navigate, NavLink, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../index.tsx';
import {AuthorizationStatus, loginThunk} from '../../Redux/Auth.ts';

export interface LoginPageProps {
  defaultCity: string;
}

export const LoginPage: React.FC<LoginPageProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, authorizationStatus} = useSelector((state: RootState) => state.auth);

  const [searchParams] = useSearchParams();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginThunk({email, password}));
    setIsSent(true);
  };

  if (!isLoading && authorizationStatus === AuthorizationStatus.AUTH && isSent) {
    return <Navigate to={searchParams.get('backUrl') ?? '/'}/>;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <NavLink className="header__logo-link" to="/">
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
            <form className="login__form form" action="#" method="post" onSubmit={(e) => handleSubmit(e)}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
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
};
