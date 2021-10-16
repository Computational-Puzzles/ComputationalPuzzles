import * as React from 'react';

import MapCard from '../../Global/MapCard';
import type { MapCardProps } from '../../Global/MapCard';

import styles from './MapCardList.module.scss';

const MapCardList = ({ cardList }: { cardList: MapCardProps[] }) => {
  return (
    <div className={styles.cardList}>
      {cardList.map((card, index) => {
        return <MapCard {...card} type="LIST" key={`card ${index + 1}`} />;
      })}
    </div>
  );
};

export default MapCardList;
