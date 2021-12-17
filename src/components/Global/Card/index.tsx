import * as React from 'react';

import { Button } from '../';
import { Difficulty } from '../';

import styles from './Card.module.scss';
import { CardProps } from '../../../types/cards';

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
      <p>{content}</p>
      <div className={styles.cardFooter}>
        <div className={styles.buttonWrap}>
          {buttonActions.map((buttonAction, index) => (
            <Button
              key={`card_buttons_${index}`}
              style={buttonAction.style}
              link={buttonAction.link}
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
