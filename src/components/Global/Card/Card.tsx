import * as React from 'react';

import styles from './mapCard.module.scss';

type HARD = 'hard';
type MEDIUM = 'medium';
type EASY = 'easy';
type DIFFICULTY = EASY | MEDIUM | HARD;

type CARD_LIST = 'list';
type CARD_GRID = 'grid';
type CARD_TYPE = CARD_LIST | CARD_GRID;

export type CardProps = {
  title: string;
  desc: string;
  diff: DIFFICULTY;
  type?: CARD_TYPE;
};

const Arrow = () => {
  return (
    <svg
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.899684 5.22821C0.507143 5.22617 0.187273 5.54273 0.185237 5.93528C0.1832 6.32782 0.499766 6.64769 0.892308 6.64972L0.899684 5.22821ZM13.9117 6.5091C14.1907 6.23297 14.193 5.78294 13.9169 5.50394L9.4171 0.957218C9.14097 0.678208 8.69094 0.675873 8.41193 0.952002C8.13292 1.22813 8.13059 1.67816 8.40672 1.95717L12.4065 5.99869L8.36499 9.99849C8.08598 10.2746 8.08365 10.7247 8.35977 11.0037C8.6359 11.2827 9.08593 11.285 9.36494 11.0089L13.9117 6.5091ZM0.892308 6.64972L13.408 6.71467L13.4154 5.29315L0.899684 5.22821L0.892308 6.64972Z"
        fill="#F16B67"
      />
    </svg>
  );
};

/**
 * Show 1 or 2 buttons depending on the type of the card
 */
const Buttons = ({ type }: { type: CARD_TYPE }) => {
  if (type === 'list') {
    return (
      <button>
        Solve Online
        <span className={styles.arrowBox}>
          <Arrow />
        </span>
      </button>
    );
  } else if (type === 'grid') {
    return (
      <div className={styles.buttonWrap}>
        <button>
          View Map
          <span className={styles.arrowBox}>
            <Arrow />
          </span>
        </button>
        <button>
          Solve Online
          <span className={styles.arrowBox}>
            <Arrow />
          </span>
        </button>
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
