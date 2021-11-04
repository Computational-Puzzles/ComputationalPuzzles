import React from 'react';
import { CardList, MapRenderer } from '../../../components/App';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { CardProps } from '../../../components/Global';
import puzzleMapStyles from '../../../styles/pages/PuzzleMap.module.scss';

type PuzzleMapTypes = {
  puzzles: CardProps[];
};

const PuzzleMap = ({ puzzles }: PuzzleMapTypes) => {
  return (
    <main className={puzzleMapStyles.map}>
      <h2>Puzzle Map</h2>
      <div className={puzzleMapStyles.content}>
        <MapRenderer
          markers={[
            {
              anchor: [49.805, -119.4778],
              zoom: 13
            },
            {
              anchor: [49.8, -119.4778],
              zoom: 13
            },
            {
              anchor: [49.81, -119.47784],
              zoom: 13
            },
            {
              anchor: [50.88, -119.477829],
              zoom: 8
            }
          ]}
        />
        <CardList cardList={puzzles} />
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/puzzles');
  const puzzles = res.data;

  return {
    props: {
      puzzles
    }
  };
};

export default PuzzleMap;
