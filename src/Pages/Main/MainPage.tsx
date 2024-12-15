import React from 'react';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {CitiesNavBar} from '../Navigation/CitiesNavBar.tsx';
import {Places} from './Places.tsx';
import {Page} from '../../Layout/Page.tsx';
import {AuthorizedHeader} from '../../Layout/Header.tsx';
import {City, offersByCity} from '../../Mocks/offers.ts';
import {Guid} from '../../Types/Common.ts';
import {Map} from './Map.tsx';
import {useSearchParams} from 'react-router-dom';

export interface MainPageProps {
  // offersById: { [id: Guid]: OfferDTO };
  offersByCity: Partial<Record<City, { [id: Guid]: OfferDTO }>>;
  showCount: number;
}

export const MainPage: React.FC<MainPageProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cities = Object.keys(offersByCity).map((x) => x as City);
  const [city, setCity] = React.useState<City>(searchParams.get('city') as City ?? cities[0]);
  const offers = Object.values(props.offersByCity[city] ?? []);
  const isEmpty = offers.length === 0;

  const setCityAndSearch = (newCity: City) => {
    setCity(newCity);
    setSearchParams({'city': newCity});
  };

  return (
    <Page
      header={<AuthorizedHeader/>}
      navBar={<CitiesNavBar activeCity={city} setCity={setCityAndSearch} cities={cities}/>}
      pageClassNames={'page__main--index page'}
    >
      <div className="cities">
        <div className={`cities__places-container container ${isEmpty ? 'cities__places-container--empty' : ''}`}>
          <Places city={city} offers={offers} showCount={props.showCount}/>
          <Map isEmpty={isEmpty}/>
        </div>
      </div>
    </Page>
  );
};
