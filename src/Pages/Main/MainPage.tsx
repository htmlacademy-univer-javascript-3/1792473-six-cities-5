import React from 'react';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {CitiesNavBar} from '../Navigation/CitiesNavBar.tsx';
import {Places} from './Places.tsx';

export interface MainPageProps {
  offers: OfferDTO[];
  showCount: number;
}

export const MainPage: React.FC<MainPageProps> = (props) => (
  <main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <CitiesNavBar/>
    <Places offers={props.offers} showCount={props.showCount}/>
  </main>
);
