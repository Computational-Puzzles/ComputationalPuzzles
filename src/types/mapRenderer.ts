import {Dispatch, SetStateAction} from "react";
import {CardProps} from "./cards";

export type MapAnchor = [number, number];

export type MapMarker = {
  anchor: MapAnchor;
  zoom: number;
};

export type PuzzleInstance = {
  id: string;
  longitude: number;
  latitude: number;
  address: string;
  puzzle: CardProps;
};

export type MapRendererProps = {
  markers: MapMarker[];
  userMarker: MapMarker;
  mapCenter: MapAnchor;
  setMapCenter: Dispatch<SetStateAction<MapAnchor>>;
};