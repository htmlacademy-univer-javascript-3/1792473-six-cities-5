import React, {CSSProperties, PropsWithChildren} from 'react';
import {MapContainer, Marker, TileLayer, useMap} from 'react-leaflet';
import {LPinActiveIcon, LPinIcon} from './Icons.ts';
import {Location} from '../Types/Offer/Offer.ts';

export interface MapMarkersProps {
  markerCords: Location[];
  activeCords?: Location[];
}

export const MapMarkers: React.FC<MapMarkersProps> = (props) => (
  <React.Fragment>
    {props.markerCords.map((m) => (
      <Marker
        icon={props.activeCords?.includes(m) ? LPinActiveIcon : LPinIcon}
        position={[m.latitude, m.longitude]} key={`${m.latitude}${m.longitude}`}
      />))}
  </React.Fragment>
);

export interface MapProps {
  centerCords: Location;
  style?: CSSProperties;
}

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom, {duration: 1});
  return null;
};

export const Map: React.FC<PropsWithChildren<MapProps>> = (props) => (
  <MapContainer center={[props.centerCords.latitude, props.centerCords.longitude]} zoom={props.centerCords.zoom} scrollWheelZoom style={props.style}>
    <ChangeView center={[props.centerCords.latitude, props.centerCords.longitude]} zoom={props.centerCords.zoom}/>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    {props.children}
  </MapContainer>
);
