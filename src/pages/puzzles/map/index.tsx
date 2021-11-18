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

type PuzzleMapTypes = {
  puzzleInstances: PuzzleInstance[];
};

const PuzzleMap = ({puzzleInstances}: PuzzleMapTypes) => {
  const [userMarker, setUserMarker] = useState<Marker>(null);
  const [mapCenter, setMapCenter] = useState<Anchor>(null);
  const [displayPuzzleInstances, setDisplayPuzzleInstances] = useState<PuzzleInstance[]>([]);
  const [difficultySelected, setDifficultySelected] = useState<{ easy: boolean, medium: boolean, hard: boolean }>(
    {easy: true, medium: true, hard: true}
  );
  
  useEffect((): void => {
    navigator.geolocation.getCurrentPosition(position => {
      const anchor: Anchor = [
        position.coords.latitude,
        position.coords.longitude
      ];
      const zoom = 16;
      setUserMarker({anchor, zoom});
      setMapCenter(anchor);
    });
  }, []);
  
  useEffect((): void => {
    setDisplayPuzzleInstances(puzzleInstances);
  }, [puzzleInstances]);
  
  const setMapCenterFromInstanceIndex = (instanceIndex: number): void => {
    const puzzleInstance = displayPuzzleInstances[instanceIndex];
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
      displayPuzzleInstances.sort(
        (a, b) =>
          getDistanceFromCenter([a.latitude, a.longitude]) -
          getDistanceFromCenter([b.latitude, b.longitude])
      );
    }
  }, [mapCenter, getDistanceFromCenter, displayPuzzleInstances]);
  
  const onDifficultyFilterChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    let tempDiffSelected = difficultySelected;
    tempDiffSelected[value] = checked;
    setDifficultySelected(tempDiffSelected);
  }
  
  useEffect((): void => {
    setDisplayPuzzleInstances(puzzleInstances.map(instance => {
      for (let difficulty in difficultySelected) {
        if (difficultySelected[difficulty] && instance.puzzle.difficulty === difficulty.toUpperCase()) {
          return instance;
        }
      }
    }));
  }, [puzzleInstances, difficultySelected]);
  
  return (
    <main className={puzzleMapStyles.map}>
      <h2>Puzzles Map</h2>
      <MapGeocoder setMapCenter={setMapCenter}/>
      <div>
        <label>
          <input type='checkbox' value={'easy'} defaultChecked={true} onChange={onDifficultyFilterChange}/>
          Easy
        </label>
        <label>
          <input type='checkbox' value={'medium'} defaultChecked={true} onChange={onDifficultyFilterChange}/>
          Medium
        </label>
        <label>
          <input type='checkbox' value={'hard'} defaultChecked={true} onChange={onDifficultyFilterChange}/>
          Hard
        </label>
      </div>
      <div className={puzzleMapStyles.content}>
        <MapRenderer
          markers={displayPuzzleInstances.map(instance => {
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
            cardList={displayPuzzleInstances.map((instance, index) => {
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
