import React, {CSSProperties} from 'react';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import {Cords} from '../Types/Offer/Offer.ts';
import {LPinIcon, LPinActiveIcon} from './Icons.ts';

export interface MapProps {
  centerCords?: Cords;
  markerCords?: Cords[];
  centerMarkerCords?: Cords;
  style?: CSSProperties;
}

export const Map: React.FC<MapProps> = (props) => props.centerCords === undefined || props.markerCords === undefined
  ? null
  : (
    <MapContainer center={[props.centerCords.x, props.centerCords.y]} zoom={13} scrollWheelZoom style={props.style}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.markerCords.map((m) => <Marker icon={LPinIcon} position={[m.x, m.y]} key={`${m.x}${m.y}`}/>)}
      {props.centerMarkerCords && <Marker icon={LPinActiveIcon} position={[props.centerMarkerCords.x, props.centerMarkerCords.y]} key={`${props.centerMarkerCords.x}${props.centerMarkerCords.y}`}/>}
    </MapContainer>
  );
