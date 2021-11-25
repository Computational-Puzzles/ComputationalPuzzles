import React, { useState } from 'react';
import RadioButton from '../RadioButton';
import styles from './Filter.module.scss';
import { Button } from '../index';

const Filter = () => {
  const [easyChecked, setEasyChecked] = useState(false);
  const [mediumChecked, setMediumChecked] = useState(false);
  const [hardChecked, setHardChecked] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  return (
    <div>
      <form className={styles.filter}>
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
      <Button
        style={'outline'}
        content={'Search'}
        onClick={() => {
          alert(
            'easy ' +
              easyChecked +
              '//med ' +
              mediumChecked +
              '//hard ' +
              hardChecked
          );
        }}
      />
    </div>
  );
};

export default Filter;
