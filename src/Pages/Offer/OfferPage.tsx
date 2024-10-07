import React from 'react';
import {OfferDTO, UserDTO} from '../../Types/Offer/Offer.ts';
import {Review} from './Review.tsx';
import {NearPlace} from './NearPlace.tsx';
import {Nullable} from 'vitest';


export interface OfferPageProps {
  user: Nullable<UserDTO>;
  offer: OfferDTO;
}

export const OfferPage: React.FC<OfferPageProps> = (props) =>
  (
    <main className="page__main page__main--offer page">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {props.offer.details?.allImagePaths.map((x) =>
              (
                <div className="offer__image-wrapper" key={x}>
                  <img className="offer__image" src={x} alt="Photo studio"/>
                </div>
              )
            )}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              props.offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {props.offer.shortDescription}
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: '80%'}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">4.8</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {props.offer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {`${props.offer.details?.bedroomsCount} Bedrooms`}
              </li>
              <li className="offer__feature offer__feature--adults">
                {`Max ${props.offer.details?.maxAdultsCount} adults`}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{props.offer.cost}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {props.offer.details?.insides.map((x, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li className="offer__inside-item" key={`${x}_${i}`}>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={props.offer.details?.host?.avatarImagePath} width="74"
                    height="74" alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                  {props.offer.details?.host?.name}
                </span>
                <span className="offer__user-status">
                  {props.offer.details?.host?.level}
                </span>
              </div>
              <div className="offer__description">
                {props.offer.description.map((x) => <p className="offer__text" key={null}>{x}</p>)}
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{props.offer.reviews.length}</span>
              </h2>

              {props.offer.reviews.map((x) => <Review review={x} key={x.id}/>)}

              {props.user !== null &&
                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <div className="reviews__rating-form form__rating">
                    <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                    <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
                    <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
                    <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
                    <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
                    <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>
                  </div>
                  <textarea className="reviews__textarea form__textarea" id="review" name="review"
                    placeholder="Tell how was your stay, what you like and what can be improved"
                  >
                  </textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe
                    your
                    stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled={undefined}>Submit
                    </button>
                  </div>
                </form>}
            </section>
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {props.offer.getNeighbours().map((x) => <NearPlace offer={x} key={x.id}/>)}
          </div>
        </section>
      </div>
    </main>
  );
