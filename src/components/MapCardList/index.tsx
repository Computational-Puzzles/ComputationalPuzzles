import * as React from 'react';

import MapCard from '../MapCard';
import type { MapCardProps } from '../MapCard';

import styles from './MapCardList.module.scss';

const MapCardList: React.FC<{cardList: MapCardProps[]}> = ({ cardList }) => {
    console.log(cardList);

    return (
        <div className={styles.cardList}>
            {cardList.map((card, index) => {
                return <MapCard {...card} key={`card ${index}`}/>
            })}
        </div>
    )
};

export default MapCardList;