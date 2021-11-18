import * as React from 'react';

import { Button } from '../';

import styles from './mapCard.module.scss';
import { CARD_TYPE, CardProps, DIFFICULTY } from '../../../types/cards';

/**
 * Show 1 or 2 buttons depending on the type of the card
 */
const Buttons = ({ type, link }: { type: CARD_TYPE; link: string }) => {
  if (type === 'list') {
    return (
      <Button
        style="primary"
        content="Solve online"
        arrowDirection="right"
        link={link}
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
          link={link}
        />
      </div>
    );
  }
};

/**
 * Adjust color of the difficulty text
 */
const Difficulty = ({ difficulty }: { difficulty: DIFFICULTY }) => {
  if (difficulty === 'EASY') {
    return <span className={styles.easy}>Easy</span>;
  }
  if (difficulty === 'MEDIUM') {
    return <span className={styles.medium}>Medium</span>;
  }
  if (difficulty === 'HARD') {
    return <span className={styles.hard}>Hard</span>;
  }
};

const Card = ({ name, content, difficulty, type, link }: CardProps) => {
  return (
    <div
      className={`${styles.card} ${
        type ? styles.cardHeightButton : styles.cardHeightDefault
      }`}
    >
      <div className={styles.cardHeader}>
        <p className={styles.title}>{name}</p>
        <p className={styles.difficulty}>
          Difficulty: <Difficulty difficulty={difficulty} />
        </p>
      </div>
      {content}
      {type && <Buttons type={type} link={link} />}
    </div>
  );
};

export default Card;
