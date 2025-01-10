import React, {useMemo} from 'react';
import {OfferDTO} from '../../types';
import {NavLink} from 'react-router-dom';
import {Header, Page, Spinner} from '../../сomponents';
import {useSelector} from 'react-redux';
import {RootState} from '../../index.tsx';
import {selectFavorites} from '../../store';
import {FavoritesList} from './favorites-list.tsx';
import {AppRoute} from '../../utils';

const groupFavoritesByCity = (offers: OfferDTO[]): Record<string, OfferDTO[]> => offers.reduce((result, o) => {
  const city = o.city.name;
  if (!result[city]) {
    result[city] = [];
  }
  result[city].push(o);
  return result;
}, {} as Record<string, OfferDTO[]>);

export const FavoritesPage: React.FC = () => {
  const loading = useSelector((state: RootState) => state.offers.loading.favoritesLoading);
  const error = useSelector((state: RootState) => state.offers.error.favoritesError);
  const favorites = useSelector(selectFavorites);

  const favouritesByCity = useMemo(() => groupFavoritesByCity(favorites ?? []), [favorites]);

  if (error) {
    return <div>Ошибка {error.message}</div>;
  }

  if (loading || !favorites) {
    return <Spinner/>;
  }

  const isEmpty = favorites.length === 0;

  return (
    <Page
      header={<Header clickableLogo/>}
      pageClassNames="page--favorites-empty"
      contentClassNames={`page__main--favorites ${isEmpty ? 'page__main--favorites-empty' : ''}`}
      authRequired
      footer=
        {
          <footer className="footer container">
            <NavLink className="footer__logo-link" to={AppRoute.Main}>
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
