import React, { useEffect, useState } from 'react';
import RadioButton from '../RadioButton';
import styles from './Filter.module.scss';
import { FilterProps } from '../../../types/filter';

const Filter = ({ setFilterFields }: FilterProps) => {
  const [easyChecked, setEasyChecked] = useState(true);
  const [mediumChecked, setMediumChecked] = useState(true);
  const [hardChecked, setHardChecked] = useState(true);

  useEffect(() => {
    setFilterFields &&
      setFilterFields({
        EASY: easyChecked,
        MEDIUM: mediumChecked,
        HARD: hardChecked
      });
  }, [easyChecked, mediumChecked, hardChecked, setFilterFields]);

  return (
    <div>
      <form className={styles.filter}>
        <RadioButton
          id={'radioEasy'}
          name={'filter'}
          difficulty={'EASY'}
          onClick={() => {
            setEasyChecked(wasChecked => !wasChecked);
          }}
        />
        <RadioButton
          id={'radioMedium'}
          name={'filter'}
          difficulty={'MEDIUM'}
          onClick={() => {
            setMediumChecked(wasChecked => !wasChecked);
          }}
        />
        <RadioButton
          id={'radioHard'}
          name={'filter'}
          difficulty={'HARD'}
          onClick={() => {
            setHardChecked(wasChecked => !wasChecked);
          }}
        />
      </form>
    </div>
  );
};

export default Filter;
