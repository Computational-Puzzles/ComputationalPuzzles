import { DIFFICULTY } from '../../../types/global';
import styles from './Difficulty.module.scss';
import * as React from 'react';

const Difficulty = ({ difficulty }: { difficulty: DIFFICULTY }) => {
  let diffRef;
  if (difficulty === 'EASY') {
    diffRef = <span className={styles.easy}>Easy</span>;
  }
  if (difficulty === 'MEDIUM') {
    diffRef = <span className={styles.medium}>Medium</span>;
  }
  if (difficulty === 'HARD') {
    diffRef = <span className={styles.hard}>Hard</span>;
  }

  return <span className={styles.difficulty}>{diffRef}</span>;
};

export default Difficulty;
