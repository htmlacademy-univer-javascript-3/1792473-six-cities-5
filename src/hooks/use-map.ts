import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import {Location} from '../types';

interface MapConfig {
  center: Location;
  tileLayerUrl?: string;
  attribution?: string;
}

export const useMap = (mapRef: MutableRefObject<HTMLElement | null>, config: MapConfig): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: config.center.latitude,
          lng: config.center.longitude,
        },
        zoom: config.center.zoom,
      });

      const layer = new TileLayer(
        config.tileLayerUrl ||
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            config.attribution ||
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

      instance.addLayer(layer);

      if (isMounted) {
        setMap(instance);
      }

      isRenderedRef.current = true;
    }

    return () => {
      isMounted = false;
    };
  }, [mapRef, config]);

  return map;
};
