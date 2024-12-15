import React, {useMemo} from 'react';
import {City, Cords, OfferDTO} from '../../Types/Offer/Offer.ts';
import {CitiesNavBar} from '../Navigation/CitiesNavBar.tsx';
import {Places} from './Places.tsx';
import {Page} from '../../Layout/Page.tsx';
import {AuthorizedHeader} from '../../Layout/Header.tsx';
import {Guid} from '../../Types/Common.ts';
import {PlaceMap} from './PlaceMap.tsx';
import {useSearchParams} from 'react-router-dom';
import {Nullable} from 'vitest';

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
  const [activePlace, setActivePlace] = React.useState<Nullable<OfferDTO>>(null);

  const setCityAndSearch = (newCity: City) => {
    setCity(newCity);
    setSearchParams({'city': newCity});
  };

  const center = useMemo((): Cords | null => {
    if (offers.length === 0) {
      return null;
    }
    const xs = offers.map((o) => o.cords?.x ?? 0).filter((x) => x !== 0);
    const x = xs.reduce((a, b) => a + b) / xs.length;
    const ys = offers.map((o) => o.cords?.y ?? 0).filter((y) => y !== 0);
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
          <Places city={city} offers={offers} showCount={props.showCount} setActivePlace={setActivePlace}/>
          <PlaceMap centerCords={activePlace?.cords ?? center} markerCords={offers.filter((x) => x.cords != null).map((x) => x.cords as Cords)}/>
        </div>
      </div>
    </Page>
  );
};
