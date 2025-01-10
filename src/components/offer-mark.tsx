import React from 'react';

export interface OfferMarkProps {
  isPremium: boolean;
  classPrefix: string;
}

export const OfferMark: React.FC<OfferMarkProps> = (props) =>
  props.isPremium ?
    <div className={`${props.classPrefix}__mark`}>
      <span>Premium</span>
    </div>
    : null;
