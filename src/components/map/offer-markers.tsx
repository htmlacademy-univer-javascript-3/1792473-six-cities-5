import React from 'react';
import {LPinActiveIcon, LPinIcon} from '../icons.ts';
import {OfferDTO} from '../../types';
import {Marker} from './marker.tsx';

export interface OfferMarkersProps {
  offers: OfferDTO[];
  activeOffers?: OfferDTO[];
}

export const OfferMarkers: React.FC<OfferMarkersProps> = (props) => (
  <React.Fragment>
    {props.offers.map((offer) => (
      <Marker
        icon={props.activeOffers?.includes(offer) ? LPinActiveIcon : LPinIcon}
        position={offer.location} key={offer.id}
      />))}
  </React.Fragment>
);
