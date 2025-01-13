import React, {CSSProperties, PropsWithChildren, useEffect, useRef} from 'react';
import {useMap} from '../../hooks';
import {Location} from '../../types';
import {MapContext} from './context.ts';

interface MapProps {
  center: Location;
  style?: CSSProperties;
}

export const Map: React.FC<PropsWithChildren<MapProps>> = (props) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, {center: props.center});

  useEffect(() => {
    let isMounted = true;

    if (map && isMounted) {
      map.flyTo(
        { lat: props.center.latitude, lng: props.center.longitude },
        props.center.zoom,
        {duration: 1}
      );
    }

    return () => {
      isMounted = false;
    };
  }, [map, props.center]);

  return (
    <div style={props.style} ref={mapRef} data-testid="map">
      {map &&
        <MapContext.Provider value={map}>
          {props.children}
        </MapContext.Provider>}
    </div>
  );
};
