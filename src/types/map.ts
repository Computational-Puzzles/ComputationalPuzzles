import { Dispatch, SetStateAction } from 'react';
import { CardProps } from './cards';

export type MapGeocoderProps = {
  setMapCenter: Dispatch<SetStateAction<Anchor>>;
};

export type Anchor = [number, number];

export type MapMarker = {
  anchor: Anchor;
  zoom: number;
};

export type MapPuzzleInstance = {
  longitude: number;
  latitude: number;
  address: string;
  puzzle: CardProps;
};

export type MapRendererProps = {
  markers: MapMarker[];
  userMarker: MapMarker;
  mapCenter: Anchor;
  setMapCenter: Dispatch<SetStateAction<Anchor>>;
};
