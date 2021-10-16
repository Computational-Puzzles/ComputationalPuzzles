import * as React from 'react';

import MapCard from '../MapCard';
import type { MapCardProps } from '../MapCard';

import styles from './GridCard.module.scss';

const GridCard: React.FC<{ cardList: MapCardProps[] }> = ({ cardList }) => {
    return (
        <div className={styles.cardGrid}>
            {cardList.map((card, index) => {
                return <MapCard {...card} type='GRID' key={`card ${index}`}/>
            })}
        </div>
    );
};

export default GridCard;