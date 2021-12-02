import * as React from 'react';

import { Card } from '../../Global';
import type { PuzzleCardProps } from '../../Global';

import styles from './CardGrid.module.scss';

const CardGrid = ({ cardList }: { cardList: PuzzleCardProps[] }) => {
  return (
    <div className={styles.cardGrid}>
      {cardList.map((card, index) => {
        return <Card {...card} type="grid" key={`card ${index}`} />;
      })}
    </div>
  );
};

export default CardGrid;
