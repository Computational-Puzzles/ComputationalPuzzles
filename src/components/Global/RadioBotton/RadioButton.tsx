import styles from './RadioButton.module.scss';

type RadioButtonProps = {
    id: string, /*radioEasy*/
    name: string, /*filter*/
    difficulty: string, /*Easy>> */
}

const RadioButton = ({id, name, difficulty}: RadioButtonProps)=> {
    let labelColor;
    if(difficulty ==='Easy'){
        labelColor = styles.easy;
    }else if(difficulty ==='Medium'){
        labelColor = styles.medium;
    }else if(difficulty ==='Hard'){
        labelColor = styles.hard;
    }else{
        labelColor = styles.normal;
    }
    return(
        <div className= 'radio'>
            <input className={styles.gone}
                type = 'radio'
                id = {id}
                name={name}
                value={difficulty}
            />
            <label htmlFor={id} className={labelColor}>
                {difficulty}
            </label>
        </div>
    )
}

export default RadioButton;
