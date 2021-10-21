import React from 'react';

type PuzzleInputProps = {
  type: 'text' | 'mcq';
  placeholder?: string;
  options?: string[];
  setAnswer: () => void;
};

const PuzzleInput = ({ type, placeholder, options, setAnswer }) => {
  if (type === 'text') {
    return <input placeholder={placeholder} onChange={e => setAnswer(e.currentTarget.value)} />;
  } else if (type === 'mcq') {
    return (
      <div>
        {options.map((option, i) => (
          <label key={`answerOption${i}`}>
            {option}
            <input type="radio" value={option} onChange={e => setAnswer(e.currentTarget.value)}/>
          </label>
        ))}
      </div>
    );
  }
};

export default PuzzleInput;
