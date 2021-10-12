import * as React from 'react';

import MapCard from '../MapCard';
import type { MapCardProps } from '../MapCard';

import styles from './MapCardList.module.scss';

const MapCardList: React.FC<{cardList: MapCardProps[]}> = ({ cardList }) => {
    return (
        <div className={styles.cardList}>
            {cardList.map((card, index) => {
                return <MapCard {...card}  type='list' key={`card ${index + 1}` }/>
            })}
        </div>
    )
};

export default MapCardList;