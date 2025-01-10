import React from 'react';

export interface StarsRatingInputProps {
  rating: number;
  onSetRating: (rating: number) => void;
}

export const StarsRatingInput: React.FC<StarsRatingInputProps> = (props) => (
  <div className="reviews__rating-form form__rating">
    {[5, 4, 3, 2, 1].map((i) => (
      <React.Fragment key={i}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={`${i}`}
          id={`${i}-stars`}
          type="radio"
          checked={props.rating === i}
          onChange={() => props.onSetRating(i)}
        />
        <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </React.Fragment>
    ))}
  </div>
);
