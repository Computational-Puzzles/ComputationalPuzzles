import * as React from 'react';
import type { Difficulty as DIFFICULTY } from '@prisma/client';
import { difficultySentenceCase } from '../../../utils/difficulty';
import styles from './Difficulty.module.scss';

const getDifficultyClass = (difficulty: DIFFICULTY) => {
  if (difficulty === 'EASY') return styles.easy;
  if (difficulty === 'MEDIUM') return styles.medium;
  if (difficulty === 'HARD') return styles.hard;
};

const Difficulty = ({ difficulty }: { difficulty: DIFFICULTY }) => {
  return (
    <span className={styles.difficulty}>
      <span className={`${getDifficultyClass(difficulty)}`}>
        {difficultySentenceCase(difficulty)}
      </span>
    </span>
  );
};

export default Difficulty;
