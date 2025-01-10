import React, {useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {BookmarkToggle, Header, Map, OfferMark, OfferMarkers, Page, Spinner, StarsRating} from '../../сomponents';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../index.tsx';
import {fetchNearbyOffersThunk, fetchOfferThunk, fetchReviewsThunk, selectNearPlaces,} from '../../store';
import {OfferGallery} from './offer-gallery.tsx';
import {OfferReviews} from './offer-reviews.tsx';
import {OfferHost} from './offer-host.tsx';
import {NearPlaces} from './near-places.tsx';
import {OfferFeatures} from './offer-features.tsx';
import {OfferGoods} from './offer-goods.tsx';
import {AppRoute} from '../../utils';

export const OfferPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id: offerId} = useParams<{ id: string }>();
  const {offer, reviews} = useSelector((state: RootState) => state.offers.currentOffer);
  const nearPlaces = useSelector(selectNearPlaces);
  const loading = useSelector((state: RootState) => state.offers.loading.offerLoading);
  const error = useSelector((state: RootState) => state.offers.error.offerError);
  const user = useSelector((state: RootState) => state.auth.user);

  const nearestPlaces = nearPlaces?.slice(0, 3);

  useEffect(() => {
    if (!offerId) {
      return () => {
      };
    }
    dispatch(fetchOfferThunk({id: offerId}));
    dispatch(fetchNearbyOffersThunk({id: offerId}));
    dispatch(fetchReviewsThunk({id: offerId}));
  }, [dispatch, offerId]);

  if (error) {
    return <div>Ошибка {error.message}</div>;
  }

  if (!offerId) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  if (loading || !offer) {
    return <Spinner/>;
  }

  return (
    <Page
      header={<Header clickableLogo/>}
      pageClassNames="page__main--offer page"
    >
      <section className="offer">
        <OfferGallery imagePaths={offer.images}/>
        <div className="offer__container container">
          <div className="offer__wrapper">
            <OfferMark isPremium={offer.isPremium} classPrefix="offer"/>
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
              </h1>
              <BookmarkToggle
                classPrefix="offer__bookmark"
                altText="To bookmarks"
                offer={offer}
                isActive={offer.isFavorite}
                iconStyle={{width: 31, height: 33}}
              />
            </div>
            <StarsRating rating={offer.rating} classPrefix="offer" showTextRating/>
            <OfferFeatures type={offer.type} bedrooms={offer.bedrooms} maxAdults={offer.maxAdults}/>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <OfferGoods goods={offer.goods}/>
            <OfferHost host={offer.host} description={offer.description}/>
            <OfferReviews offerId={offerId} reviews={reviews} user={user}/>
          </div>
        </div>
        <section className="offer__map map">
          <Map
            centerCords={offer.city.location}
            style={{height: '100%'}}
          >
            <OfferMarkers
              offers={nearestPlaces?.concat([offer]) ?? [offer]}
              activeOffers={[offer]}
            />
          </Map>
        </section>
      </section>
      <div className="container">
        <NearPlaces nearPlaces={nearestPlaces}/>
      </div>
    </Page>
  );
};
