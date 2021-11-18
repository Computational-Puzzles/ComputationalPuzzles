import * as React from 'react';

import type { CardProps } from '../../Global';
import { Card } from '../../Global';

import styles from './CardList.module.scss';

type CardListProps = {
  cardList: CardProps[];
};

const CardList = ({ cardList }: CardListProps) => {
  return (
    <div className={styles.cardList}>
      {cardList.map((card, index) => {
        return <Card key={`card ${index + 1}`} {...card} type="list" />;
      })}
    </div>
  );
};

export default CardList;
