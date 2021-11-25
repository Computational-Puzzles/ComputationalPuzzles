import React from 'react';
import styles from './RadioButton.module.scss';

type DIFFICULTY = 'easy' | 'medium' | 'hard';

type RadioButtonProps = {
  id: string;
  name: string;
  difficulty: DIFFICULTY;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};
const getLabelColor = (difficulty: DIFFICULTY, isChecked: boolean) => {
  if (difficulty === 'easy')
    return isChecked ? styles.easyChecked + ' ' + styles.easy : styles.easy;
  if (difficulty === 'medium')
    return isChecked ? styles.mediumChecked + ' ' + styles.medium : styles.medium;
  if (difficulty === 'hard')
    return isChecked ? styles.hardChecked + ' ' + styles.hard : styles.hard;
};

const RadioButton = ({
  id,
  name,
  difficulty,
  checked,
  setChecked
}: RadioButtonProps) => {
  return (
    <div className="radio">
      <input
        className={styles.gone}
        type="radio"
        id={id}
        name={name}
        value={difficulty}
        onClick={() => {
          setChecked(wasChecked => !wasChecked);
        }}
      />
      <label className={`${getLabelColor(difficulty, checked)}`} htmlFor={id}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </label>
    </div>
  );
};

export default RadioButton;
