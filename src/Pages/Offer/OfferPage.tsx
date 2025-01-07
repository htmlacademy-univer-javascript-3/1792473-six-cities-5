import React, {useEffect} from 'react';
import {Review} from './Review.tsx';
import {Navigate, useParams} from 'react-router-dom';
import {Page} from '../../Layout/Page.tsx';
import {Header} from '../../Layout/Header.tsx';
import {CommentForm} from './CommentForm.tsx';
import {Map} from '../../Components/Map.tsx';
import {PlaceCard} from '../../Components/PlaceCard.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../index.tsx';
import {
  addReviewThunk,
  fetchNearbyOffersThunk,
  fetchOfferThunk,
  fetchReviewsThunk,
  toggleFavoritesThunk
} from '../../Redux/Offers.ts';
import {Spinner} from '../../Components/Spinner.tsx';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {Toggle} from '../../Components/Toggle.tsx';
import {StarsRating} from "./StarsRating.tsx";

export interface OfferPageProps {
}

export const OfferPage: React.FC<OfferPageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id: offerId} = useParams<{ id: string }>();
  const {isLoading, error, offer, reviews, nearPlaces} = useSelector((state: RootState) => state.offers);
  const user = useSelector((state: RootState) => state.auth.user);

  const [activePlace, setActivePlace] = React.useState<OfferDTO | undefined>(undefined);

  useEffect(() => {
    if (!offerId) {
      return () => {
      };
    }
    dispatch(fetchOfferThunk({id: offerId}));
    dispatch(fetchNearbyOffersThunk({id: offerId}));
    dispatch(fetchReviewsThunk({id: offerId}));
  }, [dispatch, offerId]);

  const handleToggleFavorite = (o: OfferDTO) => {
    dispatch(toggleFavoritesThunk({id: o.id, status: o.isFavorite ? 0 : 1}));
  };

  if (error) {
    return <div>Ошибка {error}</div>;
  }

  if (!offerId) {
    return <Navigate to="/not_found"/>;
  }

  if (isLoading || !offer) {
    return <Spinner/>;
  }

  return (
    <Page
      header={<Header/>}
      pageClassNames="page__main--offer page"
    >
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer.images?.map((x, i) =>
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
                {offer.title}
              </h1>
              <Toggle
                classPrefix="offer__bookmark"
                onToggle={() => handleToggleFavorite(offer)}
                altText="To bookmarks"
                isActive={offer.isFavorite}
                iconStyle={{width: 31, height: 33}}
              />
            </div>
            <StarsRating rating={offer.rating} classPrefix="offer" showTextRating/>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {`${offer.bedrooms} Bedrooms`}
              </li>
              <li className="offer__feature offer__feature--adults">
                {`Max ${offer.maxAdults} adults`}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offer.goods?.map((x, i) => (
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
                  <img className="offer__avatar user__avatar" src={offer.host?.avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="offer__user-name">
                  {offer.host?.name}
                </span>
                <span className="offer__user-status">
                  {offer.host?.isPro ? 'Pro' : null}
                </span>
              </div>
              <div className="offer__description">
                {offer.description?.split('\n').map((x) => <p className="offer__text" key={x}>{x}</p>)}
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{reviews?.length ?? 0}</span>
              </h2>

              <ul className="reviews__list">
                {reviews?.map((x) => <Review review={x} key={x.id}/>)}
              </ul>

              {user !== null &&
                <CommentForm onSubmit={(data) => {
                  dispatch(addReviewThunk({id: offerId, data: data}));
                }}
                />}
            </section>
          </div>
        </div>
        <section className="offer__map map">
          <Map
            centerCords={offer.location}
            centerMarkerCords={activePlace?.location ?? offer.location}
            markerCords={nearPlaces?.map((x) => x.location).concat([offer.location]) ?? []}
            style={{height: '100%'}}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearPlaces?.map((x) => (
              <PlaceCard
                classPrefix="near-places"
                offer={x}
                key={x.id}
                toggleFavorite={() => handleToggleFavorite(x)}
                setActivePlace={setActivePlace}
              />)
            )}
          </div>
        </section>
      </div>
    </Page>
  );
};
