import React from 'react';
import {PlaceCard} from '../../Components/PlaceCard.tsx';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {NavLink} from 'react-router-dom';

export interface FavoritesListProps {
  favouritesByCity: Record<string, OfferDTO[]>;
}

export const FavoritesList: React.FC<FavoritesListProps> = (props) => (
  <ul className="favorites__list">
    {Object.keys(props.favouritesByCity).map((c) => (
      <li className="favorites__locations-items" key={c}>
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <NavLink className="locations__item-link" to={`/?city=${c}`}>
              <span>{c}</span>
            </NavLink>
          </div>
        </div>
        <div className="favorites__places">
          {props.favouritesByCity[c]?.map((o) => (
            <PlaceCard
              classPrefix="favorites"
              offer={o}
              key={o.id}
            />))}
        </div>
      </li>
    ))}
  </ul>
);
