import * as React from 'react';

import MapCard from '../../Global/MapCard';
import type { MapCardProps } from '../../Global/MapCard';

import styles from './GridCard.module.scss';

const GridCard = ({ cardList }: { cardList: MapCardProps[] }) => {
  return (
    <div className={styles.cardGrid}>
      {cardList.map((card, index) => {
        return <MapCard {...card} type="GRID" key={`card ${index}`} />;
      })}
    </div>
  );
};

export default GridCard;
