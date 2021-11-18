import React, {Dispatch, SetStateAction, useState} from 'react';
import { Geocoder } from '@maptiler/geocoder';
import {Anchor} from "../MapRenderer";

const MAPTILER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN;

type MapGeocoderProps = {
  setMapCenter: Dispatch<SetStateAction<Anchor>>;
}

const MapGeocoder = ({ setMapCenter }: MapGeocoderProps) => {
  const [geocoderSearchValue, setGeocoderSearchValue] = useState<string>('');
  const [geocoderGeocodedPlace, setGeocoderGeocodedPlace] = useState<string>('');
  
  let geocoder = new Geocoder({
    key: MAPTILER_ACCESS_TOKEN
  });
  
  const onGeocoderSearch = (): void => {
    setGeocoderSearchValue(geocoderSearchValue);
    geocoder.geocode(geocoderSearchValue).then(results => {
      const response = results.features[0];
      setGeocoderGeocodedPlace(`${response.place_name} ${response.center}`);
      setMapCenter([response.center[1], response.center[0]]);
    });
  };

  return (
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
  );
};

export default MapGeocoder;