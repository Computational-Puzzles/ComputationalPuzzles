import * as React from 'react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Geocoder } from '@maptiler/geocoder';
import styles from './LocationSearchModal.module.scss';
import MapGeocoder from '../MapGeocoder';
import type { MapAnchor, MapMarker } from '../../../types/map';
import MapRenderer from '../MapRenderer';
import { Button, Input } from '../../Global';

const MAPTILER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN;
const CENTRE_KELOWNA_LATNG: MapAnchor = [49.88307, -119.48568];

type LocationSearchModalProps = {
  address: string;
  latitude: string;
  longtitude: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LocationSearchModal = ({
  address,
  latitude,
  longtitude,
  setAddress,
  setLatitude,
  setLongitude,
  setModalIsOpen
}: LocationSearchModalProps) => {
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
        const anchor: MapAnchor = CENTRE_KELOWNA_LATNG;
        setMapCenter(anchor);
      }
    );
  }, []);

  useEffect((): void => {
    if (!latitude || !longtitude || !userMarker || !setTempMarker) return;

    setTempMarker({
      anchor: [parseFloat(latitude), parseFloat(longtitude)],
      zoom: userMarker.zoom
    });
  }, [latitude, longtitude, userMarker, setTempMarker]);

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
      {userMarker && (
        <MapRenderer
          markers={[userMarker]}
          userMarker={userMarker}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          tempMarker={tempMarker}
          setTempMarker={setTempMarker}
        />
      )}
      <div className={styles.reviewSubmit}>
        <Input
          id="choosing-address"
          type="text"
          placeholder="Address"
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
};

export default LocationSearchModal;
