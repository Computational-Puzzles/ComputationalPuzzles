import * as React from 'react';

import { Button, Difficulty } from '../';

import styles from './PuzzleCard.module.scss';
import type { CardProps } from '../../../types/cards';

const PuzzleCard = ({
  name,
  content,
  difficulty,
  buttonActions
}: CardProps) => {
  return (
    <div
      className={`${styles.card} ${
        buttonActions ? styles.cardHeightButton : styles.cardHeightDefault
      }`}
    >
      <div className={styles.cardHeader}>
        <p className={styles.title}>{name}</p>
        <p className={styles.difficulty}>
          <Difficulty difficulty={difficulty} />
        </p>
      </div>
      {content.map((text, index) => (
        <p key={`card_content_${index}`}>{text}</p>
      ))}
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

export default PuzzleCard;
