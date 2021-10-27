import React, { useState } from 'react';
import styles from './Input.module.scss';

type IndexProps = {
  type: 'text' | 'password';
  id: string;
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  labelText?: string;
};
const Index = ({
  type,
  id,
  required,
  placeholder,
  maxLength,
  labelText
}: IndexProps) => {
  const [input, setInput] = useState('');
  return (
    <>
      {labelText !== null &&
        <label htmlFor={id}>{labelText}</label>
      }
      <input
        className={styles.input}
        type={type}
        id={id}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        value={input}
        onChange={event => setInput(event.target.value)}
      />
    </>
  );
};

export default Index;
