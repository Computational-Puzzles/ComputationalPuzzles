import React from 'react';
import styles from './RadioButton.module.scss';

type DIFFICULTY = 'easy' | 'medium' | 'hard';

type RadioButtonProps = {
  id: string /*radioEasy*/;
  name: string /*filter*/;
  difficulty: DIFFICULTY;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};
const getLabelColor = (difficulty: DIFFICULTY, isChecked: boolean) => {
  return isChecked ? styles[`${difficulty}Checked`] : styles[`${difficulty}`];
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
          setChecked(!checked);
        }}
      />
      <label className={`${getLabelColor(difficulty, checked)}`} htmlFor={id}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </label>
    </div>
  );
};

export default RadioButton;
