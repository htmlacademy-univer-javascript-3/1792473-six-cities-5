import React from 'react';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {CitiesNavBar} from '../Navigation/CitiesNavBar.tsx';
import {Places} from './Places.tsx';
import {Page} from '../../Layout/Page.tsx';
import {UserPageWrapper} from '../../Layout/Header.tsx';

export interface MainPageProps {
  offers: OfferDTO[];
  showCount: number;
}

export const MainPage: React.FC<MainPageProps> = (props) => (
  <UserPageWrapper>
    <Page
      navBar={<CitiesNavBar/>}
      pageClassNames={'page__main--index page'}
    >
      <h1 className="visually-hidden">Cities</h1>
      <Places offers={props.offers} showCount={props.showCount}/>
    </Page>
  </UserPageWrapper>
);
