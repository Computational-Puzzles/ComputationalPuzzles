import styles from './RadioButton.module.scss';


type RadioButtonProps = {
    id: string, /*radioEasy*/
    name: string, /*filter*/
    difficulty: string, /*Easy>> */
    handleRadioClick: (event: object) => void
    isChecked: boolean
}
// function intialLableColor (){
//
// }

const RadioButton = ({id, name, difficulty, handleRadioClick, isChecked}: RadioButtonProps)=> {
    let labelColor;
    //initial, nobody is clicking
    //users are clicking
    if(difficulty ==='Easy'){
        if(isChecked) labelColor = styles.easyChecked;
        else labelColor = styles.easy;
    }else if(difficulty ==='Medium'){
        if(isChecked) labelColor = styles.mediumChecked;
        else labelColor = styles.medium;
    }else if(difficulty ==='Hard'){
        if(isChecked) labelColor = styles.hardChecked;
        else labelColor = styles.hard;
    }else{
        labelColor = styles.normal;
    }

    //users are hovering: in css
    return(
        <div className= 'radio'>
            <input className={styles.gone}
                type = 'radio'
                id = {id}
                name={name}
                value={difficulty}
                onChange={handleRadioClick}
            />
            <label className={labelColor} htmlFor={id}>
                {difficulty}
            </label>
        </div>
    )
}

export default RadioButton;
