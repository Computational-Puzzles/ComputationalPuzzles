import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getAllPuzzleInstances } from '../../services/puzzleInstance';
import { Header, SearchAndFilter } from '../../components/Global';
import { CardGrid } from '../../components/App';
import styles from '../../styles/pages/PuzzleList.module.scss';
import { PuzzleInstanceCustom } from '../../types/api/puzzles/instances/puzzleInstance';

type PuzzleListTypes = {
  puzzleInstances: PuzzleInstanceCustom[];
};

const PuzzleList = ({ puzzleInstances }: PuzzleListTypes) => {
  const [searchNFilter, setSearchNFilter] = useState<{
    searchText: string;
    filterFields: { EASY: boolean; MEDIUM: boolean; HARD: boolean };
  }>({
    searchText: '',
    filterFields: { EASY: true, MEDIUM: true, HARD: true }
  });
  return (
    <>
      <Header />
      <SearchAndFilter setSearchNFilterVal={setSearchNFilter} />

      <div className={styles.cardGrid}>
        <CardGrid
          cardList={puzzleInstances
            .filter(instance => {
              if (searchNFilter.searchText) {
                return (
                  searchNFilter.filterFields[instance.puzzle.difficulty] ===
                    true &&
                  instance.puzzle.name.includes(searchNFilter.searchText)
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
              return {
                name: instance.puzzle.name,
                content: [`${instance.puzzle.content[0]} ...`],
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
        />
      </div>
    </>
  );
};

export default PuzzleList;

export const getServerSideProps: GetServerSideProps = async () => {
  const puzzleInstances = await getAllPuzzleInstances(true);
  return {
    props: { puzzleInstances }
  };
};
