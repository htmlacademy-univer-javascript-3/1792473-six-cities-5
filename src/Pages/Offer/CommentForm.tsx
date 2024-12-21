import React, {FormEvent} from 'react';

export interface CommentFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({onSubmit}) =>
  (
    <form className="reviews__form form" onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((x) => (
          <React.Fragment key={x}>
            <input className="form__rating-input visually-hidden" name="rating" value={`${x}`} id={`${x}-stars`} type="radio"/>
            <label htmlFor={`${x}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" maxLength={50}
        placeholder="Tell how was your stay, what you like and what can be improved"
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
