import React, { useState } from 'react';
import { Navbar, SearchAndFilter } from '../../components/Global';
import { CardGrid } from '../../components/App';
import styles from '../../styles/pages/PuzzleList.module.scss';
import { usePuzzleInstances } from '../../hooks/usePuzzleInstances';
import { handleLoadingError } from '../../utils/errorHandler';

const PuzzleList = () => {
  const { puzzleInstances, loadingPuzzleInstances, errorPuzzleInstances } =
    usePuzzleInstances(true);
  const [searchNFilter, setSearchNFilter] = useState<{
    searchText: string;
    filterFields: { EASY: boolean; MEDIUM: boolean; HARD: boolean };
  }>({
    searchText: '',
    filterFields: { EASY: true, MEDIUM: true, HARD: true }
  });

  if (loadingPuzzleInstances || errorPuzzleInstances)
    return handleLoadingError(loadingPuzzleInstances, [errorPuzzleInstances]);

  return (
    <>
      <Navbar />
      <SearchAndFilter
        title={'Puzzle List'}
        setSearchNFilterVal={setSearchNFilter}
      />
      <div className={styles.cardGrid}>
        {puzzleInstances && <CardGrid
          cardList={puzzleInstances
            .filter(instance => {
              if (searchNFilter.searchText) {
                return (
                  searchNFilter.filterFields[instance.puzzle.difficulty] &&
                  instance.puzzle.name
                    .toLowerCase()
                    .includes(searchNFilter.searchText.toLowerCase())
                );
              } else {
                return (
                  searchNFilter.filterFields[instance.puzzle.difficulty] ===
                  true
                );
              }
            })
            .map(instance => {
              // TODO: link to view on map
              // TODO: properly handle truncations (i.e. the ... at the end of sliced strings)
              return {
                name: instance.puzzle.name,
                content: [
                  `${instance.puzzle.content.join('\n').slice(0, 150)} ...`
                ],
                difficulty: instance.puzzle.difficulty,
                buttonActions: [
                  {
                    text: 'Solve Online',
                    style: 'primary',
                    link: `/puzzles/${instance.id}`
                  }
                ]
              };
            })}
        />}
      </div>
    </>
  );
};

export default PuzzleList;
