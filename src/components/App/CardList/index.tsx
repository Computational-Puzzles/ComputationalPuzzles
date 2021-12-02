import * as React from 'react';

import { Card } from '../../Global';

import styles from './CardList.module.scss';
import { CardProps } from '../../../types/cards';

const CardList = ({ cardList }: { cardList: CardProps[] }) => {
  return (
    <div className={styles.cardList}>
      {cardList.map((card, index) => {
        return <Card {...card} type="list" key={`card ${index + 1}`} />;
      })}
    </div>
  );
};

export default CardList;
