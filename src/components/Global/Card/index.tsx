import * as React from 'react';

import { Button } from '../';

import styles from './Card.module.scss';
import { CardProps, DIFFICULTY } from '../../../types/cards';

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

const Card = ({ name, content, difficulty, buttonActions }: CardProps) => {
  return (
    <div
      className={`${styles.card} ${
        buttonActions ? styles.cardHeightButton : styles.cardHeightDefault
      }`}
    >
      <div className={styles.cardHeader}>
        <p className={styles.title}>{name}</p>
        <p className={styles.difficulty}>
          Difficulty: <Difficulty difficulty={difficulty} />
        </p>
      </div>
      {content}
      <div className={styles.cardFooter}>
        <div className={styles.buttonWrap}>
          {buttonActions.map((buttonAction, index) => (
            <Button
              key={`card_buttons_${index}`}
              style={buttonAction.style}
              onClick={buttonAction.action}
              content={buttonAction.text}
              arrowDirection="right"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
