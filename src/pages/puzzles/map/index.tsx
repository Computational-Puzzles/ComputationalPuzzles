import React, { useCallback, useEffect, useState } from 'react';
import { CardList, MapGeocoder, MapRenderer } from '../../../components/App';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import puzzleMapStyles from '../../../styles/pages/PuzzleMap.module.scss';
import {
  Anchor,
  Marker,
  PuzzleInstance
} from '../../../components/App/MapRenderer';
import { Header } from '../../../components/Global';

type PuzzleMapTypes = {
  puzzleInstances: PuzzleInstance[];
};

const PuzzleMap = ({ puzzleInstances }: PuzzleMapTypes) => {
  const [userMarker, setUserMarker] = useState<Marker>(null);
  const [mapCenter, setMapCenter] = useState<Anchor>(null);
  const [difficultySelected, setDifficultySelected] = useState<{
    EASY: boolean;
    MEDIUM: boolean;
    HARD: boolean;
  }>({ EASY: true, MEDIUM: true, HARD: true });

  useEffect((): void => {
    navigator.geolocation.getCurrentPosition(position => {
      const anchor: Anchor = [
        position.coords.latitude,
        position.coords.longitude
      ];
      const zoom = 16;
      setUserMarker({ anchor, zoom });
      setMapCenter(anchor);
    }, () => {
      const anchor: Anchor = [
        49.88307,
        -119.48568
      ];
      setMapCenter(anchor);
    });
  }, []);

  const setMapCenterFromInstanceIndex = (instanceIndex: number): void => {
    const puzzleInstance = puzzleInstances[instanceIndex];
    const anchor: Anchor = [puzzleInstance.latitude, puzzleInstance.longitude];
    setMapCenter(anchor);
  };

  const getDistanceFromCenter = useCallback(
    (anchor: Anchor): number => {
      const distLatitude = anchor[0] - mapCenter[0];
      const distLongitude = anchor[1] - mapCenter[1];
      return Math.sqrt(Math.pow(distLatitude, 2) + Math.pow(distLongitude, 2));
    },
    [mapCenter]
  );

  useEffect((): void => {
    if (mapCenter) {
      puzzleInstances.sort(
        (a, b) =>
          getDistanceFromCenter([a.latitude, a.longitude]) -
          getDistanceFromCenter([b.latitude, b.longitude])
      );
    }
  }, [mapCenter, getDistanceFromCenter, puzzleInstances]);

  const onDifficultyFilterChange = (event): void => {
    const checked = event.target.checked;
    const value = event.target.value;
    let tempDiffSelected = difficultySelected;
    tempDiffSelected[value] = checked;
    setDifficultySelected({ ...tempDiffSelected });
  };

  return (
    <main className={puzzleMapStyles.map}>
      <Header />
      <div className={puzzleMapStyles.subHeader}>
        <div className={puzzleMapStyles.leftContent}>
          <h1>Puzzles Map</h1>
          <MapGeocoder setMapCenter={setMapCenter} />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value={'EASY'}
              defaultChecked={true}
              onChange={onDifficultyFilterChange}
            />
            Easy
          </label>
          <label>
            <input
              type="checkbox"
              value={'MEDIUM'}
              defaultChecked={true}
              onChange={onDifficultyFilterChange}
            />
            Medium
          </label>
          <label>
            <input
              type="checkbox"
              value={'HARD'}
              defaultChecked={true}
              onChange={onDifficultyFilterChange}
            />
            Hard
          </label>
        </div>
      </div>
      <div className={puzzleMapStyles.content}>
        <MapRenderer
          markers={puzzleInstances
            .filter(
              instance =>
                difficultySelected[instance.puzzle.difficulty] === true
            )
            .map(instance => {
              return {
                anchor: [instance.latitude, instance.longitude],
                zoom: 16
              };
            })}
          userMarker={userMarker}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
        />
        <div>
          Nearest Puzzles From Map Center
          <CardList
            cardList={puzzleInstances
              .filter(
                instance =>
                  difficultySelected[instance.puzzle.difficulty] === true
              )
              .map((instance, index) => {
                return {
                  ...instance.puzzle,
                  content: instance.puzzle.content + ' at ' + instance.address,
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
