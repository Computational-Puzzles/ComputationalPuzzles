import * as React from 'react';

import { Card } from '../../Global';
import { CardProps } from '../../Global';

import styles from './CardList.module.scss';

const CardList = ({ cardList }: { cardList: CardProps[] }) => {
  return (
    <div className={styles.cardList}>
      {cardList.map((card, index) => {
        return <Card key={`card ${index + 1}`} {...card} type="list" />;
      })}
    </div>
  );
};

export default CardList;
