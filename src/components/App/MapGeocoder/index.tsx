import React, { Dispatch, SetStateAction, useState } from 'react';
import { Geocoder } from '@maptiler/geocoder';
import { Anchor } from '../MapRenderer';
import { Button, Input } from '../../Global';

import mapGeocoderStyles from './MapGeocoder.module.scss';

const MAPTILER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN;

type MapGeocoderProps = {
  setMapCenter: Dispatch<SetStateAction<Anchor>>;
};

const MapGeocoder = ({ setMapCenter }: MapGeocoderProps) => {
  const [geocoderSearchValue, setGeocoderSearchValue] = useState<string>('');

  let geocoder = new Geocoder({
    key: MAPTILER_ACCESS_TOKEN
  });

  const onGeocoderSearch = (): void => {
    if (geocoderSearchValue !== '') {
      geocoder.geocode(geocoderSearchValue).then(results => {
        const response = results.features[0];
        setMapCenter([response.center[1], response.center[0]]);
      });
    }
  };

  return (
    <div className={mapGeocoderStyles.mapGeocoder}>
      <Input
        type={'text'}
        id={'mapInput'}
        required={false}
        setInputVal={setGeocoderSearchValue}
        placeholder={'Search For A Location'}
      />
      <Button
        style={'primary'}
        content={'Search'}
        onClick={onGeocoderSearch}
        arrowDirection={'right'}
        size={'sm'}
      />
    </div>
  );
};

export default MapGeocoder;
