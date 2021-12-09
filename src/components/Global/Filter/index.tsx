import React, { useEffect, useState } from 'react';
import RadioButton from '../RadioButton';
import styles from './Filter.module.scss';
import { FilterProps } from '../../../types/filter';

const Filter = ({ setFilterFields }: FilterProps) => {
  const [easyChecked, setEasyChecked] = useState(false);
  const [mediumChecked, setMediumChecked] = useState(false);
  const [hardChecked, setHardChecked] = useState(false);

  useEffect(() => {
    setFilterFields &&
      setFilterFields({
        easy: easyChecked,
        medium: mediumChecked,
        hard: hardChecked
      });
  }, [easyChecked, mediumChecked, hardChecked]);

  return (
    <div>
      <form className={styles.filter}>
        <RadioButton
          id={'radioEasy'}
          name={'filter'}
          difficulty={'easy'}
          checked={easyChecked}
          onClick={() => {
            setEasyChecked(wasChecked => !wasChecked);
          }}
        />
        <RadioButton
          id={'radioMedium'}
          name={'filter'}
          difficulty={'medium'}
          checked={mediumChecked}
          onClick={() => {
            setMediumChecked(wasChecked => !wasChecked);
          }}
        />
        <RadioButton
          id={'radioHard'}
          name={'filter'}
          difficulty={'hard'}
          checked={hardChecked}
          onClick={() => {
            setHardChecked(wasChecked => !wasChecked);
          }}
        />
      </form>
    </div>
  );
};

export default Filter;
