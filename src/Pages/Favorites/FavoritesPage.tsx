import React, {useMemo} from 'react';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {NavLink} from 'react-router-dom';
import {Page} from '../../Layout/Page.tsx';
import {Header} from '../../Layout/Header.tsx';
import {PlaceCard} from '../../Components/PlaceCard.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../index.tsx';
import {Spinner} from '../../Components/Spinner.tsx';
import {selectFavorites, toggleFavoritesThunk} from '../../Redux/Offers.ts';

export interface FavoritesPageProps {
}

const groupFavoritesByCity = (offers: OfferDTO[]): Record<string, OfferDTO[]> => offers.reduce((acc, o) => {
  const city = o.city.name;
  if (!acc[city]) {
    acc[city] = [];
  }
  acc[city].push(o);
  return acc;
}, {} as Record<string, OfferDTO[]>);

export const FavoritesPage: React.FC<FavoritesPageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, error} = useSelector((state: RootState) => state.offers);
  const favorites = useSelector(selectFavorites);

  const favouritesByCity = useMemo(() => groupFavoritesByCity(favorites ?? []), [favorites]);

  const handleToggleFavorite = (o: OfferDTO) => {
    dispatch(toggleFavoritesThunk({id: o.id, status: o.isFavorite ? 0 : 1}));
  };

  if (error) {
    return <div>Ошибка {error}</div>;
  }

  if (isLoading || !favorites) {
    return <Spinner/>;
  }

  let content: JSX.Element;

  if (favorites.length > 0) {
    content = (
      <main className="page__main page__main--favorites page">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(favouritesByCity).map((c) => (
                <li className="favorites__locations-items" key={c}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <NavLink className="locations__item-link" to={`/main?city=${c}`}>
                        <span>{c}</span>
                      </NavLink>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favouritesByCity[c]?.map((o) => (
                      <PlaceCard
                        classPrefix="favorites"
                        offer={o}
                        key={o.id}
                        toggleFavorite={() => handleToggleFavorite(o)}
                      />))}
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
    <Page
      header={<Header/>}
      pageClassNames=""
      authRequired
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
  );
};
