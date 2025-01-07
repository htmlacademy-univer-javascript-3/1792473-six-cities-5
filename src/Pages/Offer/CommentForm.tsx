import React from 'react';
import {StarsRatingInput} from './StarsRatingInput.tsx';

export interface CommentFormProps {
  onSubmit: (data: CommentData) => void;
}

export interface CommentData {
  rating: number;
  comment: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({onSubmit}) => {
  const [data, setData] = React.useState<CommentData>({rating: 0, comment: ''});

  return (
    <form
      className="reviews__form form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
        setData({rating: 0, comment: ''});
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <StarsRatingInput rating={data.rating} setRating={(rating) => setData({...data, rating: rating})}/>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        minLength={50}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={data.comment}
        onChange={(e) => setData({...data, comment: e.target.value})}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe
          your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={undefined}>Submit
        </button>
      </div>
    </form>
  );
};
