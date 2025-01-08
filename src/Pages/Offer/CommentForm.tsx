import React from 'react';
import {StarsRatingInput} from './StarsRatingInput.tsx';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../index.tsx';
import {addReviewThunk} from '../../Redux/Offers.ts';
import {Guid} from '../../Types/Common.ts';

export interface CommentFormProps {
  offerId: Guid;
}

export interface CommentData {
  rating: number;
  comment: string;
}

export const CommentFormInternal: React.FC<CommentFormProps> = ({offerId}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = React.useState<CommentData>({rating: 0, comment: ''});

  const handleSubmit = () => {
    dispatch(addReviewThunk({id: offerId, data: data}));
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
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

export const CommentForm = React.memo(CommentFormInternal);
