import {OfferDTO, SortType} from '../../Types/Offer/Offer.ts';
import React from 'react';
import {PlaceCard} from '../../Components/PlaceCard.tsx';
import {Dropdown} from '../../Components/Dropdown.tsx';
import {setSortType, toggleFavoritesThunk} from '../../Redux/Offers.ts';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../index.tsx';

export interface CityPlacesProps {
  offers: OfferDTO[] | undefined;
  city: string;
  showCount: number;
  setActivePlace: (offer: OfferDTO | undefined) => void;
  sortType: SortType;
}

export const CityPlaces: React.FC<CityPlacesProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleFavorite = (offer: OfferDTO) => {
    dispatch(toggleFavoritesThunk({id: offer.id, status: offer.isFavorite ? 0 : 1}));
  };

  if (!props.offers) {
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
      <Dropdown
        values={['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first']}
        activeValue={props.sortType}
        setActiveValue={(x) => dispatch(setSortType(x as SortType))}
      />
      <div className="cities__places-list places__list tabs__content">
        {props.offers.slice(0, props.showCount).map((x) => (
          <PlaceCard
            classPrefix="cities"
            offer={x}
            setActivePlace={props.setActivePlace}
            toggleFavorite={() => handleToggleFavorite(x)}
            key={x.id}
          />))}
      </div>
    </section>
  );
};
