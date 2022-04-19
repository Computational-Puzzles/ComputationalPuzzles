import * as React from 'react';

import { PuzzleCard } from '../../Global';

import styles from './CardGrid.module.scss';
import type { CardProps } from '../../../types/cards';

const CardGrid = ({ cardList }: { cardList: CardProps[] }) => {
  return (
    <div className={styles.cardGrid}>
      {cardList.map((card, index) => {
        return <PuzzleCard {...card} type="grid" key={`card ${index}`} />;
      })}
    </div>
  );
};

export default CardGrid;
