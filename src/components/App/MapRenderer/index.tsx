import React, {useEffect, useState} from 'react';
import { Map, ZoomControl, Marker } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import { Geocoder } from '@maptiler/geocoder';
import mapRendererStyles from './MapRenderer.module.scss';

const MAPTILER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN;

const mapTilerProvider = maptiler(
  MAPTILER_ACCESS_TOKEN,
  'outdoor'
);

type Anchor = [number, number];

type Marker = {
  anchor: Anchor;
  zoom: number;
};

type MapRendererProps = {
  markers: Marker[];
};

const MapRenderer = ({ markers }: MapRendererProps) => {
  const [geocoderSearchValue, setGeocoderSearchValue] = useState<string>('');
  const [geocoderGeocodedPlace, setGeocoderGeocodedPlace] = useState<string>('');
  let geocoder = new Geocoder({
    key: MAPTILER_ACCESS_TOKEN
  });
  
  const [center, setCenter] = useState<Anchor>([
    49.882114, -119.477829
  ]);
  const [yourAnchor, setYourAnchor] = useState<Marker>(null);
  const [zoom, setZoom] = useState<number>(16);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const anchor: Anchor = [position.coords.latitude, position.coords.longitude];
      const zoom = 16;
      setCenter(anchor);
      setZoom(zoom);
      setYourAnchor({anchor, zoom});
    });
  }, []);

  const setMapFocus = (marker: Marker): void => {
    setCenter(marker.anchor);
    setZoom(marker.zoom);
  };
  
  const onGeocoderSearch = (): void => {
    setGeocoderSearchValue(geocoderSearchValue);
    geocoder.geocode(geocoderSearchValue).then((results) => {
      const response = results.features[0];
      setGeocoderGeocodedPlace(`${response.place_name} ${response.center}`);
      setCenter([response.center[1], response.center[0]]);
      setZoom(16);
    });
  }

  return (
    <div className={mapRendererStyles.mapRenderer}>
      <Map
        provider={mapTilerProvider}
        dprs={[1, 2]}
        center={center}
        zoom={zoom}
        animateMaxScreens={20}
        attribution={false}
        onBoundsChanged={({ center , zoom}) => {
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
        {yourAnchor && (
          <Marker
            width={40}
            color={'red'}
            anchor={yourAnchor.anchor}
            onClick={() => setMapFocus(yourAnchor)}
          />
        )}
        <ZoomControl />
      </Map>
      <div>
        <input type='search' value={geocoderSearchValue} onChange={event => setGeocoderSearchValue(event.target.value)} />
        <button type='button' onClick={onGeocoderSearch}>Search</button>
        {geocoderGeocodedPlace}
      </div>
      <pre>
        Center: [{center[0]}, {center[1]}]
      </pre>
      <pre>
        Markers: [
        {markers.map((marker, index) => (
          <button key={`display-marker-${index}`} onClick={() => setMapFocus(marker)}>
            (anchor: [{marker.anchor[0]}, {marker.anchor[1]}], zoom: {marker.zoom}),
          </button>
        ))}
        ]
      </pre>
      <pre>
        Your Location: [
        {yourAnchor && (
          <button onClick={() => setMapFocus(yourAnchor)}>
            (anchor: [{yourAnchor.anchor[0]}, {yourAnchor.anchor[1]}], zoom: {yourAnchor.zoom}),
          </button>
        )}
        ]
      </pre>
    </div>
  );
};

export default MapRenderer;