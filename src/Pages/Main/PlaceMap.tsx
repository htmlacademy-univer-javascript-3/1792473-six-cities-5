import React from 'react';
import {Cords} from '../../Types/Offer/Offer.ts';
import {Map} from '../../Components/Map.tsx';

export interface PlaceMapProps {
  centerCords?: Cords;
  markerCords?: Cords[];
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
