import React, {FormEvent} from 'react';
import {Cords, OfferDTO, ReviewDTO} from '../../Types/Offer/Offer.ts';
import {Review} from './Review.tsx';
import {Navigate, useParams} from 'react-router-dom';
import {Guid} from '../../Types/Common.ts';
import {Page} from '../../Layout/Page.tsx';
import {AuthContext} from '../../App.tsx';
import {AuthorizedHeader} from '../../Layout/Header.tsx';
import {CommentForm} from './CommentForm.tsx';
import {Map} from '../../Components/Map.tsx';
import {PlaceCard} from '../../Components/PlaceCard.tsx';


export interface OfferPageProps {
  getOffer: (id: Guid) => OfferDTO;
}

export const OfferPage: React.FC<OfferPageProps> = (props) => {
  const params = useParams();
  const offer = props.getOffer(params.id as Guid);
  const auth = React.useContext(AuthContext);
  const [userReview, setUserReview] = React.useState<ReviewDTO | undefined>(undefined);

  if (offer === undefined) {
    return <Navigate to="/not_found"/>;
  }

  return (
    <Page
      header={<AuthorizedHeader/>}
      pageClassNames="page__main--offer page"
    >
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer.details?.allImagePaths.map((x, i) =>
              (
                // eslint-disable-next-line react/no-array-index-key
                <div className="offer__image-wrapper" key={`${x}${i}`}>
                  <img className="offer__image" src={x} alt="Photo studio"/>
                </div>
              )
            )}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.shortDescription}
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
                {offer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {`${offer.details?.bedroomsCount} Bedrooms`}
              </li>
              <li className="offer__feature offer__feature--adults">
                {`Max ${offer.details?.maxAdultsCount} adults`}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offer.cost}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offer.details?.insides.map((x, i) => (
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
                  <img className="offer__avatar user__avatar" src={offer.details?.host?.avatarImagePath}
                    width="74"
                    height="74" alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                  {offer.details?.host?.name}
                </span>
                <span className="offer__user-status">
                  {offer.details?.host?.level}
                </span>
              </div>
              <div className="offer__description">
                {offer.description.map((x) => <p className="offer__text" key={x}>{x}</p>)}
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{offer.reviews.length + (userReview !== undefined ? 1 : 0)}</span>
              </h2>

              <ul className="reviews__list">
                {offer.reviews.map((x) => <Review review={x} key={x.id}/>)}
                {userReview && <Review review={userReview} key={userReview.id}/>}
              </ul>

              {auth?.currentUser !== undefined &&
                <CommentForm onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const entries = Object.fromEntries(new FormData(e.target as HTMLFormElement));
                  if (auth?.currentUser === undefined) {
                    return;
                  }
                  setUserReview({
                    id: '1337',
                    user: auth?.currentUser,
                    date: new Date(),
                    text: entries.review as string,
                    rating: +entries.rating
                  });
                }}
                />}
            </section>
          </div>
        </div>
        <section className="offer__map map">
          <Map
            centerCords={offer.cords}
            centerMarkerCords={offer.cords}
            markerCords={offer.getNeighbours().filter((x) => x.cords !== undefined).map((x) => x.cords as Cords)}
            style={{height: '100%'}}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {offer.getNeighbours().map((x) => <PlaceCard classPrefix="near-places" offer={x} key={x.id}/>)}
          </div>
        </section>
      </div>
    </Page>
  );
};
