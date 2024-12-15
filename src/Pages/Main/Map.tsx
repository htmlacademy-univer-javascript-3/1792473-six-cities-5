import React from 'react';

export interface MapProps {
  isEmpty: boolean;
}

export const Map: React.FC<MapProps> = ({isEmpty}) => isEmpty
  ? <div className="cities__right-section cities__right-section-empty"></div>
  : <div className="cities__right-section cities__right-section"><section className="cities__map map"></section></div>;
