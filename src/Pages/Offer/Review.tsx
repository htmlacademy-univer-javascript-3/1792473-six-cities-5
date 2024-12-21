import {ReviewDTO} from '../../Types/Offer/Offer.ts';
import React from 'react';

export interface ReviewProps {
  review: ReviewDTO;
}

export const Review: React.FC<ReviewProps> = ({review}) =>
  (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user?.avatarImagePath} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user?.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rating / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.text}</p>
        <time className="reviews__time" dateTime={review.date.toDateString()}>{review.date.toDateString()}</time>
      </div>
    </li>
  );
