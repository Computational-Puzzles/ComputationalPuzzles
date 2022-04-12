import React, { useCallback, useEffect, useState } from 'react';
import { CardGrid, MapGeocoder, MapRenderer } from '../../../components/App';
import { GetServerSideProps } from 'next';
import puzzleMapStyles from '../../../styles/pages/PuzzleMap.module.scss';
import { Filter, Header } from '../../../components/Global';
import { getAllPuzzleInstances } from '../../../services/puzzleInstance';
import { PuzzleMapProps } from '../../../types/puzzle';
import type { MapAnchor, MapMarker } from '../../../types/map';

const PuzzleMap = ({ puzzleInstances }: PuzzleMapProps) => {
  const [userMarker, setUserMarker] = useState<MapMarker>(null);
  const [mapCenter, setMapCenter] = useState<MapAnchor>(null);
  const [difficultySelected, setDifficultySelected] = useState<{
    EASY: boolean;
    MEDIUM: boolean;
    HARD: boolean;
  }>({ EASY: true, MEDIUM: true, HARD: true });

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

  const setMapCenterFromInstanceIndex = (instanceIndex: number): void => {
    const puzzleInstance = puzzleInstances[instanceIndex];
    const anchor: MapAnchor = [
      puzzleInstance.latitude,
      puzzleInstance.longitude
    ];
    setMapCenter(anchor);
  };

  const getDistanceFromCenter = useCallback(
    (anchor: MapAnchor): number => {
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

  return (
    <main className={puzzleMapStyles.map}>
      <Header />
      <div className={puzzleMapStyles.subHeader}>
        <div className={puzzleMapStyles.leftContent}>
          <h1>Puzzles Map</h1>
          <MapGeocoder setMapCenter={setMapCenter} />
        </div>
        <Filter setFilterFields={setDifficultySelected} />
      </div>
      <div className={puzzleMapStyles.content}>
        {puzzleInstances && <MapRenderer
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
        />}
        <div className={puzzleMapStyles.cardGridContainer}>
          <span className={puzzleMapStyles.title}>
            Nearest Puzzles From Map Center:
          </span>
          <div className={puzzleMapStyles.cardGrid}>
            {puzzleInstances && <CardGrid
              cardList={puzzleInstances
                .filter(
                  instance =>
                    difficultySelected[instance.puzzle.difficulty] === true
                )
                .map((instance, index) => {
                  return {
                    ...instance.puzzle,
                    content: [
                      `Find at: ${instance.address}`,
                      `Hint: ${instance.hint}`
                    ],
                    buttonActions: [
                      {
                        text: 'Solve Online',
                        style: 'primary',
                        link: `/puzzles/${instance.id}`
                      },
                      {
                        text: 'View On Map',
                        style: 'secondary',
                        action: () => setMapCenterFromInstanceIndex(index)
                      }
                    ]
                  };
                })}
            />}
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const puzzleInstances = await getAllPuzzleInstances(true);

  return {
    props: {
      puzzleInstances
    }
  };
};

export default PuzzleMap;
