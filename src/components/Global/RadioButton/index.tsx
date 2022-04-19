import React from 'react';
import styles from './RadioButton.module.scss';
import { RadioButtonProps } from '../../../types/radioButton';
import type { Difficulty } from '@prisma/client';

const getLabelColor = (difficulty: Difficulty) => {
  if (difficulty === 'EASY') return styles.easy;
  if (difficulty === 'MEDIUM') return styles.medium;
  if (difficulty === 'HARD') return styles.hard;
};

const RadioButton = ({ id, name, difficulty, onClick }: RadioButtonProps) => {
  return (
    <div className="radio">
      <input
        className={styles.checkboxHidden}
        type="checkbox"
        id={id}
        name={name}
        value={difficulty}
        onClick={onClick}
      />
      <label className={`${getLabelColor(difficulty)}`} htmlFor={id}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </label>
    </div>
  );
};

export default RadioButton;
