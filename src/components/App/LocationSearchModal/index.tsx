import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Geocoder } from '@maptiler/geocoder';
import styles from './LocationSearchModal.module.scss';
import MapGeocoder from '../MapGeocoder';
import type { MapAnchor, MapMarker } from '../../../types/map';
import MapRenderer from '../MapRenderer';
import { Button, Input } from '../../Global';
import toast from 'react-hot-toast';

const MAPTILER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN;

type LocationSearchModalProps = {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LocationSearchModal = ({ address, setAddress, setLatitude, setLongitude, setModalIsOpen }: LocationSearchModalProps) => {
  const [userMarker, setUserMarker] = useState<MapMarker>(null);
  const [mapCenter, setMapCenter] = useState<MapAnchor>(null);
  const [tempMarker, setTempMarker] = useState<MapMarker>(null);

  useEffect((): void => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const anchor: MapAnchor = [
          position.coords.latitude,
          position.coords.longitude
        ];
        const zoom = 16;
        setUserMarker({ anchor, zoom });
        setMapCenter(anchor);
      },
      () => {
        const anchor: MapAnchor = [49.88307, -119.48568];
        setMapCenter(anchor);
      }
    );
  }, []);

  useEffect(() => {
    if (!tempMarker) return;

    const lat = tempMarker.anchor[0].toString();
    const lon = tempMarker.anchor[1].toString();
    setLatitude(lat);
    setLongitude(lon);

    let geocoder = new Geocoder({
      key: MAPTILER_ACCESS_TOKEN
    });

    geocoder.geocode(`${lon},${lat}`).then(results => {
      if (!results) return;
      setAddress(results.features[0]['place_name']);
    });
  }, [setAddress, setLatitude, setLongitude, tempMarker]);

  return (
    <div className={styles.modalWraper}>
      <MapGeocoder setMapCenter={setMapCenter} />
      {userMarker && <MapRenderer
        markers={[userMarker]}
        userMarker={userMarker}
        mapCenter={mapCenter}
        setMapCenter={setMapCenter}
        tempMarker={tempMarker}
        setTempMarker={setTempMarker}
      />}
      <div className={styles.reviewSubmit}>
        <Input
          id='choosing-address'
          type='text'
          placeholder=''
          value={address}
          setInputVal={setAddress}
          required={false}
          disabled={true}
        />
        <Button
          style={'secondary'}
          content={'Set'}
          arrowDirection={'down'}
          size={'sm'}
          onClick={() => {
            toast.success('Successfully set the location');
            setModalIsOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default LocationSearchModal;
