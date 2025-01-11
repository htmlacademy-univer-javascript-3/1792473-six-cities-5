import React, {memo} from 'react';
import {OfferDTO} from '../../types';
import {PlaceCard} from '../../components';

export interface NearPlacesProps {
  nearPlaces: OfferDTO[] | undefined;
}

const NearPlacesInternal: React.FC<NearPlacesProps> = (props) => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className="near-places__list places__list">
      {props.nearPlaces?.map((offer) => (
        <PlaceCard
          classPrefix="near-places"
          offer={offer}
          key={offer.id}
        />)
      )}
    </div>
  </section>
);

export const NearPlaces = memo(NearPlacesInternal);
