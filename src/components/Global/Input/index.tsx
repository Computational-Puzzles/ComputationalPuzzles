import React, { useState } from 'react';
import styles from './Input.module.scss';
import { InputProps } from '../../../types/global';

const Input = ({
  type,
  id,
  required,
  placeholder,
  maxLength,
  minLength,
  labelText,
  labelHeader,
  setInputVal
}: InputProps) => {
  const [input, setInput] = useState('');
  return (
    <>
      <div className={styles.container}>
        {labelText && (
          <label htmlFor={id} className={styles.labelText}>
            {labelText}
          </label>
        )}
        {labelHeader && (
            <label htmlFor={id} className={styles.labelHeader}>
              {labelHeader}
            </label>
        )}
        <input
          className={styles.input}
          type={type}
          id={id}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          value={input}
          onChange={event => {
            setInput(event.target.value);
            setInputVal(event.target.value);
          }}
        />
      </div>
    </>
  );
};

export default Input;
