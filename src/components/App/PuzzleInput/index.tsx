import React from 'react';
import { PuzzleInputProps } from '../../../types/puzzle';
import { Input } from '../../Global';

const PuzzleInput = ({
  type,
  placeholder,
  options,
  setAnswer
}: PuzzleInputProps) => {
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
      <div>
        {options.map((option, i) => (
          <label key={`answerOption${i}`}>
            {option}
            <input
              name={'puzzleAnswer'}
              type="radio"
              value={option}
              onChange={e => setAnswer(e.currentTarget.value)}
            />
          </label>
        ))}
      </div>
    );
  }
};

export default PuzzleInput;
