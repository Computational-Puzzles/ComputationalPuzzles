import React, { useState } from 'react';

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
      <label htmlFor={id}>{labelText}</label>
      <input
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
