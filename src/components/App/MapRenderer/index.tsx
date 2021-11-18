import React, { useEffect, useState } from 'react';
import { Map, ZoomControl, Marker } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import { Geocoder } from '@maptiler/geocoder';
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
};

const MapRenderer = ({ markers, userMarker, mapCenter }: MapRendererProps) => {
  const [geocoderSearchValue, setGeocoderSearchValue] = useState<string>('');
  const [geocoderGeocodedPlace, setGeocoderGeocodedPlace] =
    useState<string>('');
  let geocoder = new Geocoder({
    key: MAPTILER_ACCESS_TOKEN
  });

  const [center, setCenter] = useState<Anchor>([49.882114, -119.477829]);
  const [zoom, setZoom] = useState<number>(16);

  useEffect(() => {
    setCenter(mapCenter);
  }, [mapCenter]);

  const setMapFocus = (marker: Marker): void => {
    setCenter(marker.anchor);
    setZoom(marker.zoom);
  };

  const onGeocoderSearch = (): void => {
    setGeocoderSearchValue(geocoderSearchValue);
    geocoder.geocode(geocoderSearchValue).then(results => {
      const response = results.features[0];
      setGeocoderGeocodedPlace(`${response.place_name} ${response.center}`);
      setCenter([response.center[1], response.center[0]]);
      setZoom(16);
    });
  };

  return (
    <div className={mapRendererStyles.mapRenderer}>
      <Map
        provider={mapTilerProvider}
        dprs={[1, 2]}
        center={center}
        zoom={zoom}
        animateMaxScreens={20}
        attribution={false}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
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
      <div>
        <input
          type="search"
          value={geocoderSearchValue}
          onChange={event => setGeocoderSearchValue(event.target.value)}
        />
        <button type="button" onClick={onGeocoderSearch}>
          Search
        </button>
        {geocoderGeocodedPlace}
      </div>
    </div>
  );
};

export default MapRenderer;
