import * as React from 'react';

import { Card } from '../../Global';

import type { CardProps } from '../../Global';

import styles from './GridCard.module.scss';

const GridCard = ({ cardList }: { cardList: CardProps[] }) => {
  return (
    <div className={ styles.cardGrid }>
      { cardList.map((card, index) => {
        return <Card { ...card } type="GRID" key={ `card ${index}` } />;
      }) }
    </div>
  );
};

export default GridCard;
