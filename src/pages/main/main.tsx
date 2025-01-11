import React, {useCallback, useEffect, useState,} from 'react';
import {Header, Map, OfferMarkers, Page, Spinner} from '../../components';
import {useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectFilteredOffers, setCity} from '../../store';
import {AppDispatch, RootState} from '../../index.tsx';
import {OfferDTO} from '../../types';
import {CityPlaces} from './city-places.tsx';
import {CitiesNavBar} from './cities-nav-bar.tsx';
import {ALL_CITY_NAMES} from '../../utils';

export const MainPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {offers, city, sortType} = useSelector((state: RootState) => state.offers);
  const loading = useSelector((state: RootState) => state.offers.loading.offersLoading);
  const error = useSelector((state: RootState) => state.offers.error.offersError);
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredOffers = useSelector(selectFilteredOffers);

  useEffect(() => {
    const cityFromParams = searchParams.get('city');
    if (cityFromParams && cityFromParams !== city) {
      if (ALL_CITY_NAMES.includes(cityFromParams)) {
        dispatch(setCity(cityFromParams));
      } else {
        setSearchParams({});
      }
    }
  }, [searchParams, city, dispatch, setSearchParams]);

  const [activePlace, setActivePlace] = useState<OfferDTO | undefined>(undefined);

  const handleCityChange = useCallback((newCity: string) => {
    dispatch(setCity(newCity));
    setSearchParams({city: newCity});
  }, [dispatch, setSearchParams]);

  if (error) {
    return <div>Ошибка {error.message}</div>;
  }

  if (loading || !offers) {
    return <Spinner/>;
  }

  const isEmpty = !filteredOffers || filteredOffers.length === 0;

  return (
    <Page
      header={<Header/>}
      navBar={<CitiesNavBar activeCity={city} onCityChange={handleCityChange}/>}
      pageClassNames="page--gray page--main"
      contentClassNames={`page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}
    >
      <div className="cities">
        <div className={`cities__places-container container ${isEmpty ? 'cities__places-container--empty' : ''}`}>
          <CityPlaces city={city} offers={filteredOffers} setActivePlace={setActivePlace} sortType={sortType}/>
          {isEmpty ?
            null :
            <div className="cities__right-section">
              <section className="cities__map">
                <Map
                  centerCords={filteredOffers[0].city.location}
                  style={{height: '100%'}}
                >
                  <OfferMarkers
                    offers={filteredOffers}
                    activeOffers={activePlace ? [activePlace] : undefined}
                  />
                </Map>
              </section>
            </div>}
        </div>
      </div>
    </Page>
  );
};
