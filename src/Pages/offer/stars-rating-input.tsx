import React from 'react';

export interface StarsRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
}

export const StarsRatingInput: React.FC<StarsRatingInputProps> = (props) => (
  <div className="reviews__rating-form form__rating">
    {[5, 4, 3, 2, 1].map((x) => (
      <React.Fragment key={x}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={`${x}`}
          id={`${x}-stars`}
          type="radio"
          checked={props.rating === x}
          onChange={() => props.setRating(x)}
        />
        <label htmlFor={`${x}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </React.Fragment>
    ))}
  </div>
);
