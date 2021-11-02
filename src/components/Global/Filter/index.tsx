import React, { useState } from 'react';
import RadioButton from '../RadioButton';
import styles from './Filter.module.scss';

const Filter = () => {
  const [easyChecked, setEasyChecked] = useState(false);
  const [mediumChecked, setMediumChecked] = useState(false);
  const [hardChecked, setHardChecked] = useState(false);

  return (
    <div>
      <form className={styles.filter}>
        <RadioButton
          id={'radioEasy'}
          name={'filter'}
          difficulty={'Easy'}
          checked={easyChecked}
          setChecked={setEasyChecked}
        />
        <RadioButton
          id={'radioMedium'}
          name={'filter'}
          difficulty={'Medium'}
          checked={mediumChecked}
          setChecked={setMediumChecked}
        />
        <RadioButton
          id={'radioHard'}
          name={'filter'}
          difficulty={'Hard'}
          checked={hardChecked}
          setChecked={setHardChecked}
        />
      </form>
      <button
        onClick={() =>
          alert(
            'easy ' +
              easyChecked +
              '//med ' +
              mediumChecked +
              '//hard ' +
              hardChecked
          )
        }
      >
        :DDDDDDDD
      </button>
    </div>
  );
};

export default Filter;
