import React from 'react';
import {PlaceCard} from '../../components';
import {OfferDTO} from '../../types';
import {NavLink} from 'react-router-dom';
import {getCityPath} from '../../utils';

export interface FavoritesListProps {
  favouritesByCity: Record<string, OfferDTO[]>;
}

export const FavoritesList: React.FC<FavoritesListProps> = (props) => (
  <ul className="favorites__list">
    {Object.keys(props.favouritesByCity).map((city) => (
      <li className="favorites__locations-items" key={city}>
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <NavLink className="locations__item-link" to={getCityPath(city)}>
              <span>{city}</span>
            </NavLink>
          </div>
        </div>
        <div className="favorites__places">
          {props.favouritesByCity[city]?.map((offer) => (
            <PlaceCard
              classPrefix="favorites"
              offer={offer}
              key={offer.id}
            />))}
        </div>
      </li>
    ))}
  </ul>
);
