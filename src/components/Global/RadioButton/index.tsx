import styles from './RadioButton.module.scss';
import React from 'react';

type RadioButtonProps = {
  id: string /*radioEasy*/;
  name: string /*filter*/;
  difficulty: 'Hard' | 'Medium' | 'Easy';
  checked: boolean;
  setChecked:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((wasChecked: boolean) => void);
};
const getLabelColor = (difficulty: string, isChecked: boolean) => {
  if (difficulty === 'Easy') {
    if (isChecked) return styles.easyChecked;
    else return styles.easy;
  } else if (difficulty === 'Medium') {
    if (isChecked) return styles.mediumChecked;
    else return styles.medium;
  } else if (difficulty === 'Hard') {
    if (isChecked) return styles.hardChecked;
    else return styles.hard;
  } else {
    return styles.normal;
  }

  // if(isChecked){
  //   labelColor_Checked(difficulty);
  // }else{
  //   labelColor_notChecked(difficulty);
  // }
};
// const labelColor_Checked = (difficulty: string) => {
//   if (difficulty === 'Easy') return styles.easyChecked;
//   else if (difficulty === 'Medium') return styles.mediumChecked;
//   else if (difficulty === 'Hard') return styles.hardChecked;
// };
// const labelColor_notChecked = (difficulty: string) => {
//   if (difficulty === 'Easy') return styles.easy;
//   else if (difficulty === 'Medium') return styles.medium;
//   else if (difficulty === 'Hard') return styles.hard;
//   else return styles.normal;
// };

const RadioButton = ({
  id,
  name,
  difficulty,
  checked,
  setChecked
}: RadioButtonProps) => {
  return (
    <div className="radio">
      <input
        className={styles.gone}
        type="radio"
        id={id}
        name={name}
        value={difficulty}
        onClick={() => {
          setChecked(wasChecked => !wasChecked);
        }}
      />
      <label className={`${getLabelColor(difficulty, checked)}`} htmlFor={id}>
        {difficulty}
      </label>
    </div>
  );
};

export default RadioButton;
