import React, { useState } from 'react';
import styles from './Input.module.scss';

type InputProps = {
  type: 'text' | 'password' | 'email';
  id: string;
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  labelText?: string;
  setInputVal?: React.Dispatch<React.SetStateAction<string>>;
};
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
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
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
          setInputVal && setInputVal(event.target.value);
        }}
      />
    </>
  );
};

export default Input;
