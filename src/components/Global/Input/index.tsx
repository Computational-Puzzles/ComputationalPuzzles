import React, { useState } from 'react';
import styles from './Input.module.scss';
import { InputProps } from '../../../types/global';

const Input = ({
  type,
  id,
  required,
  placeholder,
  maxLength,
  labelText
}: InputProps) => {
  const [input, setInput] = useState('');
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
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

export default Input;
