import React, { useState } from 'react';
import RadioButton from '../RadioButton';
import styles from './Filter.module.scss';

type FilterProps = {
  setFilterFields: React.Dispatch<React.SetStateAction<object>>;
};
const Filter = ({ setFilterFields }: FilterProps) => {
  const [easyChecked, setEasyChecked] = useState(false);
  const [mediumChecked, setMediumChecked] = useState(false);
  const [hardChecked, setHardChecked] = useState(false);

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
            setFilterFields({
              easy: !easyChecked,
              medium: mediumChecked,
              hard: hardChecked
            });
          }}
        />
        <RadioButton
          id={'radioMedium'}
          name={'filter'}
          difficulty={'medium'}
          checked={mediumChecked}
          onClick={() => {
            setMediumChecked(wasChecked => !wasChecked);
            setFilterFields({
              easy: easyChecked,
              medium: !mediumChecked,
              hard: hardChecked
            });
          }}
        />
        <RadioButton
          id={'radioHard'}
          name={'filter'}
          difficulty={'hard'}
          checked={hardChecked}
          onClick={() => {
            setHardChecked(wasChecked => !wasChecked);
            setFilterFields({
              easy: easyChecked,
              medium: mediumChecked,
              hard: !hardChecked
            });
          }}
        />
      </form>
      {/*{console.log("e "+ easyChecked+ " / m"+ mediumChecked+" /h"+hardChecked)}*/}
    </div>
  );
};

export default Filter;
