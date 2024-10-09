import React from 'react';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {City} from '../../index.tsx';
import {FavouritePlace} from './FavouritePlace.tsx';
import {NavLink} from 'react-router-dom';
import {Page} from '../../Layout/Page.tsx';
import {UserPageWrapper} from '../../Layout/Header.tsx';

export interface FavouritesPageProps {
  favourites: Partial<Record<City, OfferDTO[]>>;
}

export const FavouritesPage: React.FC<FavouritesPageProps> = (props) => {
  let content: JSX.Element;
  if (Object.keys(props.favourites).length > 0) {
    content = (
      <main className="page__main page__main--favorites page">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(props.favourites).map((c) => (
                <li className="favorites__locations-items" key={c}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{c}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {props.favourites[c as City]?.map((o) => <FavouritePlace offer={o} key={o.id}/>)}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    );
  } else {
    content = (
      <main className="page__main page__main--favorites page__main--favorites-empty page">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future
                trips.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }
  return (
    <UserPageWrapper>
      <Page pageClassNames="" authRequired
        footer=
          {
            <footer className="footer container page">
              <NavLink className="footer__logo-link" to="/MainPage">
                <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
              </NavLink>
            </footer>
          }
      >
        {content}
      </Page>
    </UserPageWrapper>
  );
};
