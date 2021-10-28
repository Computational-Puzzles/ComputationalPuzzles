import styles from './RadioButton.module.scss';


type RadioButtonProps = {
    id: string, /*radioEasy*/
    name: string, /*filter*/
    difficulty: string, /*Easy>> */
    checked: boolean
    setChecked: (wasChecked: any) => void
}
const getLabelColor = (difficulty: string, isChecked: boolean) => {
    // console.log(difficulty + " "+ isChecked);
    if (difficulty === 'Easy') {
        if (isChecked) {
            // console.log(isChecked + " in rdobtn @1@");
            return styles.easyChecked;
        } else {
            // console.log(isChecked + " in rdobtn @2@");
            return styles.easy;
        }
    } else if (difficulty === 'Medium') {
        if (isChecked) return styles.mediumChecked;
        else {
            return styles.medium;
        }
    } else if (difficulty === 'Hard') {
        if (isChecked) return styles.hardChecked;
        else return styles.hard;
    } else {
        return styles.normal;
    }
}

const RadioButton = ({id, name, difficulty, checked, setChecked}: RadioButtonProps) => {
    return (
        <div className='radio'>
            <input className={styles.gone}
                   type='radio'
                   id={id}
                   name={name}
                   value={difficulty}
                   onClick={() => {
                       setChecked(wasChecked => !wasChecked)
                   }}
            />
            <label className={`${getLabelColor(difficulty, checked)}`} htmlFor={id}>
                {difficulty}
            </label>
        </div>
    )
}

export default RadioButton;
