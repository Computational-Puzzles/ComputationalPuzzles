import React, { useState } from 'react';
import RadioButton from '../RadioButton';
import styles from './Filter.module.scss';
import { Input } from '../index';

const Filter = () => {
  const [easyChecked, setEasyChecked] = useState(false);
  const [mediumChecked, setMediumChecked] = useState(false);
  const [hardChecked, setHardChecked] = useState(false);

  return (
    <div>
      <form className={styles.filter}>
        <Input type={'text'} id={'filterSearch'} required={true} />
        <RadioButton
          id={'radioEasy'}
          name={'filter'}
          difficulty={'easy'}
          checked={easyChecked}
          setChecked={setEasyChecked}
        />
        <RadioButton
          id={'radioMedium'}
          name={'filter'}
          difficulty={'medium'}
          checked={mediumChecked}
          setChecked={setMediumChecked}
        />
        <RadioButton
          id={'radioHard'}
          name={'filter'}
          difficulty={'hard'}
          checked={hardChecked}
          setChecked={setHardChecked}
        />
      </form>
    </div>
  );
};

export default Filter;
