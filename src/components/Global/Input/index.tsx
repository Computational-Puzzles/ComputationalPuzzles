import React, { useEffect, useState } from 'react';
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
  setInputVal
}: InputProps) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    setInputVal && setInputVal(input);
  }, [input]);
  return (
    <>
      <div className={styles.container}>
        {labelText && (
          <label htmlFor={id} className={styles.label}>
            {labelText}
          </label>
        )}
        <input
          className={styles.input}
          type={type}
          id={id}
          name={id}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
          value={input}
          onChange={event => {
            setInput(event.target.value);
          }}
        />
      </div>
    </>
  );
};

export default Input;
