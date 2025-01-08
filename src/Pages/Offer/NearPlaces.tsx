import React from 'react';
import {OfferDTO} from '../../Types/Offer/Offer.ts';
import {PlaceCard} from '../../Components/PlaceCard.tsx';

export interface NearPlacesProps {
  nearPlaces: OfferDTO[] | undefined;
  setActivePlace?: (offer: OfferDTO | undefined) => void;
}

const NearPlacesInternal: React.FC<NearPlacesProps> = (props) => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className="near-places__list places__list">
      {props.nearPlaces?.map((x) => (
        <PlaceCard
          classPrefix="near-places"
          offer={x}
          key={x.id}
          setActivePlace={props.setActivePlace}
        />)
      )}
    </div>
  </section>
);

export const NearPlaces = React.memo(NearPlacesInternal);
