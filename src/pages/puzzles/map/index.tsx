import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CardGrid, MapGeocoder, MapRenderer } from '../../../components/App';
import { GetServerSideProps } from 'next';
import puzzleMapStyles from '../../../styles/pages/PuzzleMap.module.scss';
import { Filter, Navbar, SearchAndFilter } from '../../../components/Global';
import { getAllPuzzleInstances } from '../../../services';
import { PuzzleMapProps } from '../../../types/puzzle';
import type { MapAnchor, MapMarker } from '../../../types/map';

const PuzzleMap = ({ puzzleInstances }: PuzzleMapProps) => {
  const [userMarker, setUserMarker] = useState<MapMarker>(null);
  const [mapCenter, setMapCenter] = useState<MapAnchor>(null);
  const [searchNFilter, setSearchNFilter] = useState<{
    searchText: string;
    filterFields: { EASY: boolean; MEDIUM: boolean; HARD: boolean };
  }>({
    searchText: '',
    filterFields: { EASY: true, MEDIUM: true, HARD: true }
  });

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

  const filteredPuzzleInstances = useMemo(() => {
    return puzzleInstances
      ? puzzleInstances.filter(
        instance =>
          searchNFilter.filterFields[instance.puzzle.difficulty] === true
      )
      : [];
  }, [puzzleInstances, searchNFilter.filterFields]);

  return (
    <main className={puzzleMapStyles.map}>
      <Navbar />
      <SearchAndFilter
        title={'Puzzles Map'}
        searchElement={<MapGeocoder setMapCenter={setMapCenter} />}
        setSearchNFilterVal={setSearchNFilter}
      />
      <div className={puzzleMapStyles.content}>
        <MapRenderer
          markers={filteredPuzzleInstances.map(instance => {
            return {
              anchor: [instance.latitude, instance.longitude],
              zoom: 16
            };
          })}
          userMarker={userMarker}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
        />
        <div className={puzzleMapStyles.cardGridContainer}>
          <span className={puzzleMapStyles.title}>
            Nearest Puzzles From Map Center:
          </span>
          <div className={puzzleMapStyles.cardGrid}>
            <CardGrid
              cardList={filteredPuzzleInstances.map((instance, index) => {
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
            />
          </div >
        </div >
      </div >
    </main >
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
