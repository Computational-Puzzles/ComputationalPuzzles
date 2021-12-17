import { Dispatch, SetStateAction } from 'react';

export type MapAnchor = [number, number];

export type MapMarker = {
  anchor: MapAnchor;
  zoom: number;
};

export type MapRendererProps = {
  markers: MapMarker[];
  userMarker: MapMarker;
  mapCenter: MapAnchor;
  setMapCenter: Dispatch<SetStateAction<MapAnchor>>;
};
