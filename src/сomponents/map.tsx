import React, {CSSProperties, memo, PropsWithChildren} from 'react';
import {MapContainer, Marker, TileLayer, useMap} from 'react-leaflet';
import {LPinActiveIcon, LPinIcon} from './icons.ts';
import {Location, OfferDTO} from '../types';

export interface OfferMarkersProps {
  offers: OfferDTO[];
  activeOffers?: OfferDTO[];
}

export const OfferMarkers: React.FC<OfferMarkersProps> = (props) => (
  <React.Fragment>
    {props.offers.map((offer) => (
      <Marker
        icon={props.activeOffers?.includes(offer) ? LPinActiveIcon : LPinIcon}
        position={[offer.location.latitude, offer.location.longitude]} key={offer.id}
      />))}
  </React.Fragment>
);

interface ChangeViewProps {
  centerCords: Location;
}

const ChangeViewInternal: React.FC<ChangeViewProps> = ({centerCords}) => {
  const map = useMap();
  map.flyTo([centerCords.latitude, centerCords.longitude], centerCords.zoom, {duration: 1});
  return null;
};

// memo нужно, чтобы камера не возвращалась в centerCords после перерисовки маркеров
const ChangeView = memo(ChangeViewInternal);

export interface MapProps {
  centerCords: Location;
  style?: CSSProperties;
}

export const Map: React.FC<PropsWithChildren<MapProps>> = (props) => (
  <MapContainer center={[props.centerCords.latitude, props.centerCords.longitude]} zoom={props.centerCords.zoom} scrollWheelZoom style={props.style}>
    <ChangeView centerCords={props.centerCords}/>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    {props.children}
  </MapContainer>
);
