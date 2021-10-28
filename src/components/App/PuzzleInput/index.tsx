import React from 'react';

type PuzzleInputProps = {
  type: 'TEXT' | 'MCQ';
  placeholder?: string;
  options?: string[];
  setAnswer: (value) => void;
};

const PuzzleInput = ({
  type,
  placeholder,
  options,
  setAnswer
}: PuzzleInputProps) => {
  if (type === 'TEXT')
    return (
      // TODO: use Input component
      <input
        name={'puzzleAnswer'}
        placeholder={placeholder}
        onChange={e => setAnswer(e.currentTarget.value)}
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
