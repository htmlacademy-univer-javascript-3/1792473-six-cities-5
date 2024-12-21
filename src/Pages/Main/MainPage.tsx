import React, {useMemo} from 'react';
import {City, Cords, OfferDTO} from '../../Types/Offer/Offer.ts';
import {CitiesNavBar} from '../Navigation/CitiesNavBar.tsx';
import {CityPlaces} from './CityPlaces.tsx';
import {Page} from '../../Layout/Page.tsx';
import {AuthorizedHeader} from '../../Layout/Header.tsx';
import {Guid} from '../../Types/Common.ts';
import {useSearchParams} from 'react-router-dom';
import {Map} from '../../Components/Map.tsx';

export interface MainPageProps {
  // offersById: { [id: Guid]: OfferDTO };
  offersByCity: Partial<Record<City, { [id: Guid]: OfferDTO }>>;
  showCount: number;
}

export const MainPage: React.FC<MainPageProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cities = Object.keys(props.offersByCity).map((x) => x as City);
  const [city, setCity] = React.useState<City>(searchParams.get('city') as City ?? cities[0]);
  const offers = Object.values(props.offersByCity[city] ?? []);
  const isEmpty = offers.length === 0;
  const [activePlace, setActivePlace] = React.useState<OfferDTO | undefined>(undefined);

  const setCityAndSearch = (newCity: City) => {
    setCity(newCity);
    setSearchParams({'city': newCity});
  };

  const center = useMemo((): Cords | undefined => {
    const offersWithCords = offers.filter((o) => o.cords !== undefined);
    if (offersWithCords.length === 0) {
      return undefined;
    }
    const xs = offersWithCords.map((o) => o.cords?.x ?? 0).filter((x) => x !== 0);
    const x = xs.reduce((a, b) => a + b) / xs.length;
    const ys = offersWithCords.map((o) => o.cords?.y ?? 0).filter((y) => y !== 0);
    const y = ys.reduce((a, b) => a + b) / ys.length;
    return {x: x, y: y};
  }, [offers]);

  return (
    <Page
      header={<AuthorizedHeader/>}
      navBar={<CitiesNavBar activeCity={city} setCity={setCityAndSearch} cities={cities}/>}
      pageClassNames={'page__main--index page'}
    >
      <div className="cities">
        <div className={`cities__places-container container ${isEmpty ? 'cities__places-container--empty' : ''}`}>
          <CityPlaces city={city} offers={offers} showCount={props.showCount} setActivePlace={setActivePlace}/>
          {center === undefined ? <div className="cities__right-section cities__right-section-empty"/> :
            <div className="cities__right-section">
              <section className="cities__map">
                <Map
                  centerCords={center}
                  centerMarkerCords={activePlace?.cords ?? undefined}
                  markerCords={offers.filter((x) => x.cords !== undefined).map((x) => x.cords as Cords)}
                  style={{height: '100%'}}
                />
              </section>
            </div>}
        </div>
      </div>
    </Page>
  );
};
