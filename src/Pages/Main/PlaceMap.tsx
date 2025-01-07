import React from 'react';
import {Map} from '../../Components/Map.tsx';
import {Location} from '../../Types/Offer/Offer.ts';

export interface PlaceMapProps {
  centerCords?: Location;
  markerCords?: Location[];
}

export const PlaceMap: React.FC<PlaceMapProps> = (props) => props.centerCords === undefined
  ? <div className="cities__right-section cities__right-section-empty"></div>
  : (
    <div className="cities__right-section">
      <section className="cities__map">
        <Map markerCords={props.markerCords} centerCords={props.centerCords} style={{height: '100%'}}/>
      </section>
    </div>
  );
