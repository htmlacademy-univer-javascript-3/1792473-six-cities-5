import {OfferDTO, City} from '../../Types/Offer/Offer.ts';
import React from 'react';
import {Place} from './Place.tsx';
import {Nullable} from 'vitest';

export interface PlacesProps {
  offers: OfferDTO[];
  city: City;
  showCount: number;
  setActivePlace: (offer: Nullable<OfferDTO>) => void;
}

export const Places: React.FC<PlacesProps> = (props) => {

  if (props.offers.length === 0) {
    return (
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in
              {props.city}
            </p>
          </div>
        </section>
      </div>
    );
  }
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{props.offers.length} places to stay in {props.city}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
              Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        {props.offers.slice(0, props.showCount).map((x) => <Place offer={x} setActivePlace={props.setActivePlace} key={x.id}/>)}
      </div>
    </section>
  );
};
