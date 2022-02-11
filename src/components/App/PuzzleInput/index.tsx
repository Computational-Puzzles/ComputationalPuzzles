import React from 'react';
import { PuzzleInputProps } from '../../../types/puzzle';
import { Input } from '../../Global';

import styles from './PuzzleInput.module.scss';

const PuzzleInput = ({
  type,
  placeholder,
  options,
  answer,
  setAnswer
}: PuzzleInputProps) => {
  const handleCLick = e => {
    const inputElement = e.currentTarget.getElementsByTagName('INPUT')[0];
    setAnswer(inputElement.value);
  };

  if (type === 'TEXT')
    return (
      <Input
        type={'text'}
        id={'puzzleAnswer'}
        required={true}
        placeholder={placeholder}
        setInputVal={setAnswer}
      />
    );
  if (type === 'MCQ') {
    return (
      <div className={`${styles.answerOptionDrawer}`}>
        {options.map((option, i) => (
          <div
            key={`answerOption${i}`}
            className={`${styles.answerOption} ${
              answer === option && styles.selected
            }`}
            onClick={e => handleCLick(e)}
          >
            <input
              name={'puzzleAnswer'}
              type="radio"
              value={option}
              hidden={true}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    );
  }
};

export default PuzzleInput;
