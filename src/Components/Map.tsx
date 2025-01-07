import React, {CSSProperties} from 'react';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import {LPinActiveIcon, LPinIcon} from './Icons.ts';
import {Location} from '../Types/Offer/Offer.ts';

export interface MapProps {
  centerCords: Location;
  markerCords: Location[];
  centerMarkerCords?: Location;
  style?: CSSProperties;
}

export const Map: React.FC<MapProps> = (props) => (
  <MapContainer center={[props.centerCords.latitude, props.centerCords.longitude]} zoom={props.centerCords.zoom} scrollWheelZoom style={props.style}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {props.markerCords.map((m) => <Marker icon={LPinIcon} position={[m.latitude, m.longitude]} key={`${m.latitude}${m.longitude}`}/>)}
    {props.centerMarkerCords &&
      <Marker
        icon={LPinActiveIcon}
        position={[props.centerMarkerCords.latitude, props.centerMarkerCords.longitude]}
        key={`${props.centerMarkerCords.latitude}${props.centerMarkerCords.longitude}`}
      />}
  </MapContainer>
);
