import React from 'react';
import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import {Cords} from '../../Types/Offer/Offer.ts';
import {Nullable} from 'vitest';

export interface MapProps {
  centerCords?: Nullable<Cords>;
  markerCords?: Nullable<Cords[]>;
}

// eslint-disable-next-line eqeqeq
export const PlaceMap: React.FC<MapProps> = (props) => props.centerCords == undefined || props.markerCords == null
  ? <div className="cities__right-section cities__right-section-empty"></div>
  : (
    <div className="cities__right-section">
      <section className="cities__map">
        <MapContainer center={[props.centerCords.x, props.centerCords.y]} zoom={13} scrollWheelZoom={true} style={{height: '100%'}}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {props.markerCords.map((m) => <Marker position={[m.x, m.y]} key={`${m.x}${m.y}`}/>)}
        </MapContainer>
      </section>
    </div>
  );
