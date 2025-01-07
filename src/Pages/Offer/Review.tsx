import {ReviewDTO} from '../../Types/Offer/Offer.ts';
import React from 'react';
import {StarsRating} from './StarsRating.tsx';

export interface ReviewProps {
  review: ReviewDTO;
}

export const Review: React.FC<ReviewProps> = ({review}) =>
  (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user?.avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user?.name}</span>
      </div>
      <div className="reviews__info">
        <StarsRating rating={review.rating} classPrefix="reviews"/>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>{review.date}</time>
      </div>
    </li>
  );
