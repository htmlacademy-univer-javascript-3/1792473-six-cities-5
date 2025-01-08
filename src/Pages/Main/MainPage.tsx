import React, {useEffect,} from 'react';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {CitiesNavBar} from '../Navigation/CitiesNavBar.tsx';
import {CityPlaces} from './CityPlaces.tsx';
import {Page} from '../../Layout/Page.tsx';
import {Header} from '../../Layout/Header.tsx';
import {useSearchParams} from 'react-router-dom';
import {Map, MapMarkers} from '../../Components/Map.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectFilteredOffers, setCity} from '../../Redux/Offers.ts';
import {Spinner} from '../../Components/Spinner.tsx';
import {AppDispatch, RootState} from '../../index.tsx';

export interface MainPageProps {
  showCount: number;
}

export const MainPage: React.FC<MainPageProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, error, offers, city, sortType} = useSelector((state: RootState) => state.offers);
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredOffers = useSelector(selectFilteredOffers);

  useEffect(() => {
    const cityFromParams = searchParams.get('city');
    if (cityFromParams && cityFromParams !== city) {
      dispatch(setCity(cityFromParams));
    }
  }, [searchParams, city, dispatch]);

  const [activePlace, setActivePlace] = React.useState<OfferDTO | undefined>(undefined);

  const handleCityChange = React.useCallback((newCity: string) => {
    dispatch(setCity(newCity));
    setSearchParams({city: newCity});
  }, [dispatch, setSearchParams]);

  if (error) {
    return <div>Ошибка {error}</div>;
  }

  if (isLoading || !offers) {
    return <Spinner/>;
  }

  const isEmpty = filteredOffers?.length ?? 0 === 0;

  return (
    <Page
      header={<Header/>}
      navBar={<CitiesNavBar activeCity={city} setCity={handleCityChange}/>}
      pageClassNames={'page__main--index page'}
    >
      <div className="cities">
        <div className={`cities__places-container container ${isEmpty ? 'cities__places-container--empty' : ''}`}>
          <CityPlaces city={city} offers={filteredOffers} showCount={props.showCount} setActivePlace={setActivePlace} sortType={sortType}/>
          {!filteredOffers || filteredOffers.length === 0 ?
            <div className="cities__right-section cities__right-section-empty"/> :
            <div className="cities__right-section">
              <section className="cities__map">
                <Map
                  centerCords={filteredOffers[0].city.location}
                  style={{height: '100%'}}
                >
                  <MapMarkers
                    activeCords={activePlace?.location ? [activePlace?.location] : undefined}
                    markerCords={filteredOffers.map((x) => x.location)}
                  />
                </Map>
              </section>
            </div>}
        </div>
      </div>
    </Page>
  );
};
