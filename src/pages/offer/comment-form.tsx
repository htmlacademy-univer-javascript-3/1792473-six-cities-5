import React, {memo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../index.tsx';
import {addReviewThunk, clearSendingReviewError, clearSendingReviewStatus} from '../../store';
import {Guid} from '../../types';
import {StarsRatingInput} from './stars-rating-input.tsx';
import {MessageBox} from '../../components';

export interface CommentFormProps {
  offerId: Guid;
}

export interface CommentData {
  rating: number;
  comment: string;
  disabled: boolean;
}

export const CommentFormInternal: React.FC<CommentFormProps> = ({offerId}) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.offers.loading.sendingReviewLoading);
  const error = useSelector((state: RootState) => state.offers.error.sendingReviewError);
  const status = useSelector((state: RootState) => state.offers.status.successfullySentReview);
  const [data, setData] = useState<CommentData>({rating: 0, comment: ''} as CommentData);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addReviewThunk({id: offerId, data: data}));
  };

  useEffect(() => {
    if (status) {
      dispatch(clearSendingReviewStatus());
      setData({rating: 0, comment: ''} as CommentData);
    }
  }, [dispatch, status]);

  const handleCloseMessageBox = () => {
    dispatch(clearSendingReviewError());
  };

  return (
    <React.Fragment>
      {error && <MessageBox message={error.message ?? 'Не удалось отправить комментарий'} onClose={handleCloseMessageBox} level="error"/>}
      <form className="reviews__form form" onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <label className="reviews__label form__label" htmlFor="review">Your review</label>
          <StarsRatingInput rating={data.rating} onSetRating={(rating) => setData({...data, rating: rating})}/>
          <textarea
            className="reviews__textarea form__textarea"
            id="review"
            name="review"
            minLength={50}
            maxLength={300}
            placeholder="Tell how was your stay, what you like and what can be improved"
            value={data.comment}
            onChange={(event) => setData({...data, comment: event.target.value})}
          >
          </textarea>
          <div className="reviews__button-wrapper">
            <p className="reviews__help">
            To submit review please make sure to set
              <span className="reviews__star">rating</span>
            and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
            </p>
            <button className="reviews__submit form__submit button" type="submit" disabled={data.rating === 0 || data.comment.length < 50}>Submit</button>
          </div>
        </fieldset>
      </form>
    </React.Fragment>
  );
};

export const CommentForm = memo(CommentFormInternal);
