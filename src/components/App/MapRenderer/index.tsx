import React from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import mapRendererStyles from './MapRenderer.module.scss';
import { MapMarker, MapRendererProps } from '../../../types/map';

const MAPTILER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN;

const mapTilerProvider = maptiler(MAPTILER_ACCESS_TOKEN, 'outdoor');

const MapRenderer = ({
  markers,
  userMarker,
  mapCenter,
  setMapCenter
}: MapRendererProps) => {
  const setMapFocus = (marker: MapMarker): void => {
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
