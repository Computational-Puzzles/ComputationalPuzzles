import React, { useEffect, useState } from 'react';
import { CardList, MapRenderer } from '../../../components/App';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import puzzleMapStyles from '../../../styles/pages/PuzzleMap.module.scss';
import {
  Anchor,
  Marker,
  PuzzleInstance
} from '../../../components/App/MapRenderer';

type PuzzleMapTypes = {
  puzzleInstances: PuzzleInstance[];
};

const PuzzleMap = ({ puzzleInstances }: PuzzleMapTypes) => {
  const [userMarker, setUserMarker] = useState<Marker>(null);
  const [mapCenter, setMapCenter] = useState<Anchor>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const anchor: Anchor = [
        position.coords.latitude,
        position.coords.longitude
      ];
      const zoom = 16;
      setUserMarker({ anchor, zoom });
      setMapCenter(anchor);
    });
  }, []);

  const setMapCenterFromInstanceIndex = instanceIndex => {
    const puzzleInstance = puzzleInstances[instanceIndex];
    const anchor: Anchor = [puzzleInstance.latitude, puzzleInstance.longitude];
    setMapCenter(anchor);
  };

  return (
    <main className={puzzleMapStyles.map}>
      <h2>Puzzles Map</h2>
      <div className={puzzleMapStyles.content}>
        <MapRenderer
          markers={puzzleInstances.map(instance => {
            return {
              anchor: [instance.latitude, instance.longitude],
              zoom: 16
            };
          })}
          userMarker={userMarker}
          mapCenter={mapCenter}
        />
        <CardList
          cardList={puzzleInstances.map((instance, index) => {
            return {
              ...instance.puzzle,
              buttonActions: [
                {
                  text: 'Solve Online',
                  style: 'primary',
                  action: () => alert('Solve online')
                },
                {
                  text: 'View On Map',
                  style: 'secondary',
                  action: () => setMapCenterFromInstanceIndex(index)
                }
              ]
            };
          })}
        />
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const resInstances = await axios.get(
    'http://localhost:3000/api/puzzle_instances'
  );
  const puzzleInstances = resInstances.data;
  for (const puzzleInstance of puzzleInstances) {
    const puzzle = await axios.get(
      `http://localhost:3000/api/puzzles/${puzzleInstance.puzzleId}`
    );
    puzzleInstance.puzzle = puzzle.data;
  }

  return {
    props: {
      puzzleInstances
    }
  };
};

export default PuzzleMap;
