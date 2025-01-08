import React from 'react';
import {OfferType} from '../../types';

export interface OfferFeaturesProps {
  type: OfferType;
  bedrooms: number | undefined;
  maxAdults: number | undefined;
}

const OfferFeaturesInternal: React.FC<OfferFeaturesProps> = (props) => (
  <ul className="offer__features">
    <li className="offer__feature offer__feature--entire">
      {props.type}
    </li>
    <li className="offer__feature offer__feature--bedrooms">
      {`${props.bedrooms} Bedrooms`}
    </li>
    <li className="offer__feature offer__feature--adults">
      {`Max ${props.maxAdults} adults`}
    </li>
  </ul>
);

export const OfferFeatures = React.memo(OfferFeaturesInternal);
