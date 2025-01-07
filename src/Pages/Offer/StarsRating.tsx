import React from 'react';

export interface StarsRatingProps {
  rating: number;
  classPrefix: string;
  showTextRating?: boolean;
}

export const StarsRating: React.FC<StarsRatingProps> = (props) => (
  <div className={`${props.classPrefix}__rating rating`}>
    <div className={`${props.classPrefix}__stars rating__stars`}>
      <span style={{width: `${props.rating / 5 * 100}%`}}></span>
      <span className="visually-hidden">Rating</span>
    </div>
    {props.showTextRating && <span className={`${props.classPrefix}__rating-value rating__value`}>{props.rating.toFixed(1)}</span>}
  </div>
);
