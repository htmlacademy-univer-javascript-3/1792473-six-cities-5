import {Location} from '../../types';
import {Icon, layerGroup, Marker as LeafletMarker} from 'leaflet';
import React, {useEffect} from 'react';
import {useMapContext} from './context.ts';

interface MarkerProps {
  position: Location;
  icon?: Icon;
}

export const Marker: React.FC<MarkerProps> = ({ position, icon}) => {
  const map = useMapContext();

  useEffect(() => {
    let isMounted = true;

    if (!map || !isMounted) {
      return;
    }

    const markerLayer = layerGroup().addTo(map);
    new LeafletMarker(
      {
        lat: position.latitude,
        lng: position.longitude,
      },
      { icon }
    ).addTo(markerLayer);

    return () => {
      if (isMounted) {
        map.removeLayer(markerLayer);
      }
      isMounted = false;
    };
  }, [map, position, icon]);

  return null;
};
