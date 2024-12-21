import React from 'react';
import {NavLink} from 'react-router-dom';
import {OfferDTO} from '../Types/Offer/Offer.ts';

export interface PlaceCardProps {
  offer: OfferDTO;
  classPrefix: string;
  setActivePlace?: (offer: OfferDTO | undefined) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = (props) => (
  <article
    className={`${props.classPrefix}__card place-card`}
    onClick={() => props.setActivePlace === undefined ? () => {} : props.setActivePlace(props.offer)}
    // onMouseLeave={() => props.setActivePlace(undefined)}
  >
    {
      props.offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    }
    <div className={`${props.classPrefix}__image-wrapper place-card__image-wrapper`}>
      <NavLink to={`/offer/${props.offer.id}`}>
        <img className={`place-card__image ${props.classPrefix}__image`} src={props.offer.imagePath} alt="Place image"/>
      </NavLink>
    </div>
    <div className={`${props.classPrefix}__card-info place-card__info`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{props.offer.cost}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${props.offer.rating}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <NavLink to={`/offer/${props.offer.id}`}>{props.offer.shortDescription}</NavLink>
      </h2>
      <p className="place-card__type">{props.offer.type}</p>
    </div>
  </article>
);
