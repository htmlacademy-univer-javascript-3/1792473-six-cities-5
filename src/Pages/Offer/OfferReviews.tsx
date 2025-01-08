import React from 'react';
import {Review} from './Review.tsx';
import {ReviewDTO, UserDTO} from '../../Types/Offer/Offer.ts';
import {CommentForm} from './CommentForm.tsx';
import {Guid} from '../../Types/Common.ts';

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
      {props.reviews?.map((x) => <Review review={x} key={x.id}/>)}
    </ul>

    {props.user !== null && <CommentForm offerId={props.offerId}/>}
  </section>
);

export const OfferReviews = React.memo(OfferReviewsInternal);
