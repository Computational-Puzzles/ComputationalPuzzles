import React, { Dispatch, SetStateAction } from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import mapRendererStyles from './MapRenderer.module.scss';
import { CardProps } from '../../Global';

const MAPTILER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN;

const mapTilerProvider = maptiler(MAPTILER_ACCESS_TOKEN, 'outdoor');

export type Anchor = [number, number];

export type Marker = {
  anchor: Anchor;
  zoom: number;
};

export type PuzzleInstance = {
  longitude: number;
  latitude: number;
  address: string;
  puzzle: CardProps;
};

type MapRendererProps = {
  markers: Marker[];
  userMarker: Marker;
  mapCenter: Anchor;
  setMapCenter: Dispatch<SetStateAction<Anchor>>;
};

const MapRenderer = ({
  markers,
  userMarker,
  mapCenter,
  setMapCenter
}: MapRendererProps) => {
  const setMapFocus = (marker: Marker): void => {
    setMapCenter(marker.anchor);
  };

  return (
    <div className={mapRendererStyles.mapRenderer}>
      <Map
        provider={mapTilerProvider}
        dprs={[1, 2]}
        center={mapCenter}
        animateMaxScreens={20}
        attribution={false}
        onBoundsChanged={({ center }) => {
          setMapCenter(center);
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            width={40}
            anchor={marker.anchor}
            onClick={() => setMapFocus(marker)}
          />
        ))}
        {userMarker && (
          <Marker
            width={40}
            color={'red'}
            anchor={userMarker.anchor}
            onClick={() => setMapFocus(userMarker)}
          />
        )}
        <ZoomControl />
      </Map>
    </div>
  );
};

export default MapRenderer;
