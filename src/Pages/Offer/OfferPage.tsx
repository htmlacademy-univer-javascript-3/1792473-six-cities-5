import React, {useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {Page} from '../../Layout/Page.tsx';
import {Header} from '../../Layout/Header.tsx';
import {Map, MapMarkers} from '../../Components/Map.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../index.tsx';
import {
  fetchNearbyOffersThunk,
  fetchOfferThunk,
  fetchReviewsThunk,
} from '../../Redux/Offers.ts';
import {Spinner} from '../../Components/Spinner.tsx';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {BookmarkToggle} from '../../Components/Toggle.tsx';
import {StarsRating} from './StarsRating.tsx';
import {OfferGallery} from './OfferGallery.tsx';
import {OfferReviews} from './OfferReviews.tsx';
import {OfferHost} from './OfferHost.tsx';
import {OfferMark} from '../../Components/OfferMark.tsx';
import {NearPlaces} from './NearPlaces.tsx';
import {OfferFeatures} from './OfferFeatures.tsx';
import {OfferGoods} from './OfferGoods.tsx';

export const OfferPage: React.FC = () => {
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
            centerCords={offer.location}
            style={{height: '100%'}}
          >
            <MapMarkers
              activeCords={[activePlace?.location ?? offer.location]}
              markerCords={nearPlaces?.map((x) => x.location).concat([offer.location]) ?? []}
            />
          </Map>
        </section>
      </section>
      <div className="container">
        <NearPlaces nearPlaces={nearPlaces} setActivePlace={setActivePlace}/>
      </div>
    </Page>
  );
};
