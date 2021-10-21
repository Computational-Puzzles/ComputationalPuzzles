import * as React from 'react';

import { Card } from '../../Global';
import type { CardProps } from '../../Global';

import styles from './MapCardList.module.scss';

const MapCardList = ({ cardList }: { cardList: CardProps[] }) => {
  return (
    <div className={ styles.cardList }>
      { cardList.map((card, index) => {
        return <Card { ...card } type="LIST" key={ `card ${index + 1}` } />;
      }) }
    </div>
  );
};

export default MapCardList;
