import {createContext, useContext} from 'react';
import {Map as LeafletMap} from 'leaflet';

export const MapContext = createContext<LeafletMap | null>(null);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};
