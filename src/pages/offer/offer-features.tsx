import React, {memo} from 'react';
import {getOfferTypeView, OfferType} from '../../types';
import {morphByNumber} from '../../utils';

export interface OfferFeaturesProps {
  type: OfferType;
  bedrooms: number | undefined;
  maxAdults: number | undefined;
}

const OfferFeaturesInternal: React.FC<OfferFeaturesProps> = (props) => (
  <ul className="offer__features">
    <li className="offer__feature offer__feature--entire">
      {getOfferTypeView(props.type)}
    </li>
    <li className="offer__feature offer__feature--bedrooms">
      {`${props.bedrooms} ${morphByNumber('Bedroom', 'Bedrooms', props.bedrooms ?? 0)}`}
    </li>
    <li className="offer__feature offer__feature--adults">
      {`Max ${props.maxAdults} ${morphByNumber('adult', 'adults', props.maxAdults ?? 0)}`}
    </li>
  </ul>
);

export const OfferFeatures = memo(OfferFeaturesInternal);
