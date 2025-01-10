import React, {memo} from 'react';
import {Review} from './review.tsx';
import {Guid, ReviewDTO, UserDTO} from '../../types';
import {CommentForm} from './comment-form.tsx';

export interface OfferReviewsProps {
  offerId: Guid;
  reviews: ReviewDTO[] | null;
  user: UserDTO | null;
}

const OfferReviewsInternal: React.FC<OfferReviewsProps> = (props) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{props.reviews?.length ?? 0}</span>
    </h2>

    <ul className="reviews__list">
      {
        (props.reviews ? [...props.reviews] : null)
          ?.sort((review) => -new Date(review.date))
          .slice(0, 10)
          .map((review) => <Review review={review} key={review.id}/>)
      }
    </ul>

    {props.user !== null && <CommentForm offerId={props.offerId}/>}
  </section>
);

export const OfferReviews = memo(OfferReviewsInternal);
