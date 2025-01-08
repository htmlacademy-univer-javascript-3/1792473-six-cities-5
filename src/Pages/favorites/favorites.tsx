import React, {useMemo} from 'react';
import {OfferDTO} from '../../types';
import {NavLink} from 'react-router-dom';
import {Header, Page, Spinner} from '../../сomponents';
import {useSelector} from 'react-redux';
import {RootState} from '../../index.tsx';
import {selectFavorites} from '../../store';
import {FavoritesList} from './favorites-list.tsx';

const groupFavoritesByCity = (offers: OfferDTO[]): Record<string, OfferDTO[]> => offers.reduce((acc, o) => {
  const city = o.city.name;
  if (!acc[city]) {
    acc[city] = [];
  }
  acc[city].push(o);
  return acc;
}, {} as Record<string, OfferDTO[]>);

export const FavoritesPage: React.FC = () => {
  const {isLoading, error} = useSelector((state: RootState) => state.offers);
  const favorites = useSelector(selectFavorites);

  const favouritesByCity = useMemo(() => groupFavoritesByCity(favorites ?? []), [favorites]);

  if (error) {
    return <div>Ошибка {error}</div>;
  }

  if (isLoading || !favorites) {
    return <Spinner/>;
  }

  const isEmpty = favorites.length === 0;

  return (
    <Page
      header={<Header/>}
      pageClassNames=""
      authRequired
      footer=
        {
          <footer className="footer container page">
            <NavLink className="footer__logo-link" to="/">
              <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
            </NavLink>
          </footer>
        }
    >
      {
        <main className={`page__main page__main--favorites page ${isEmpty ? 'page__main--favorites-empty' : ''}`}>
          <div className="page__favorites-container container">
            <section className={`favorites ${isEmpty ? 'favorites--empty' : ''}`}>
              {isEmpty &&
                <>
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                  </div>
                </>}
              {!isEmpty &&
                <>
                  <h1 className="favorites__title">Saved listing</h1>
                  <FavoritesList favouritesByCity={favouritesByCity}/>
                </>}
            </section>
          </div>
        </main>
      }
    </Page>
  );
};
