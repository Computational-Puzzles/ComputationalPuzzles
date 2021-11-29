import * as React from 'react';

import { Button } from '../';

import styles from './mapCard.module.scss';
import { CARD_TYPE, CardProps, DIFFICULTY } from '../../../types/cards';

/**
 * Show 1 or 2 buttons depending on the type of the card
 */
const Buttons = ({ type }: { type: CARD_TYPE }) => {
  if (type === 'list') {
    return (
      <Button
        style="primary"
        content="Solve online"
        arrowDirection="right"
        onClick={() => alert('Solve online')}
      />
    );
  } else if (type === 'grid') {
    return (
      <div className={styles.buttonWrap}>
        <Button
          style="secondary"
          content="View map"
          arrowDirection="right"
          onClick={() => alert('View map')}
        />
        <Button
          style="primary"
          content="Solve online"
          arrowDirection="right"
          onClick={() => alert('Solve online')}
        />
      </div>
    );
  }
};

/**
 * Adjust color of the difficulty text
 */
const Difficulty = ({ diff }: { diff: DIFFICULTY }) => {
  if (diff === 'easy') {
    return <span className={styles.easy}>Easy</span>;
  }
  if (diff === 'medium') {
    return <span className={styles.medium}>Medium</span>;
  }
  if (diff === 'hard') {
    return <span className={styles.hard}>Hard</span>;
  }
};

const Card = ({ title, desc, diff, type }: CardProps) => {
  return (
    <div
      className={`${styles.card} ${
        type ? styles.cardHeightButton : styles.cardHeightDefault
      }`}
    >
      <div className={styles.cardHeader}>
        <p className={styles.title}>{title}</p>
        <p className={styles.difficulty}>
          Difficulty: <Difficulty diff={diff} />
        </p>
      </div>
      {desc}
      {type && <Buttons type={type} />}
    </div>
  );
};

export default Card;
