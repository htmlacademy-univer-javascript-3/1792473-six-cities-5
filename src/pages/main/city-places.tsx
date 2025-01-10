import {OfferDTO, SortType} from '../../types';
import React, {memo} from 'react';
import {Dropdown, PlaceCard} from '../../сomponents';
import {setSortType} from '../../store';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../index.tsx';

export interface CityPlacesProps {
  offers: OfferDTO[] | undefined;
  city: string;
  setActivePlace: (offer: OfferDTO | undefined) => void;
  sortType: SortType;
}

const CityPlacesInternal: React.FC<CityPlacesProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  if (!props.offers || props.offers.length === 0) {
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
        <div className="cities__right-section cities__right-section-empty"/>
      </div>
    );
  }
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{props.offers.length} places to stay in {props.city}</b>
      <Dropdown
        values={[SortType.Popular, SortType.Asc, SortType.Desc, SortType.TopRated]}
        activeValue={props.sortType}
        onSetActiveValue={(value) => dispatch(setSortType(value as SortType))}
      />
      <div className="cities__places-list places__list tabs__content">
        {props.offers.map((offer) => (
          <PlaceCard
            classPrefix="cities"
            offer={offer}
            onSetActivePlace={props.setActivePlace}
            key={offer.id}
          />))}
      </div>
    </section>
  );
};

export const CityPlaces = memo(CityPlacesInternal);
