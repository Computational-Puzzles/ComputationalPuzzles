import styles from './RadioButton.module.scss';


type RadioButtonProps = {
    id: string, /*radioEasy*/
    name: string, /*filter*/
    difficulty: string, /*Easy>> */
    handleRadioClick: (event: object) => void
    isChecked: boolean
}
const getLabelColor = (difficulty: string, isChecked:boolean) =>{
    if(difficulty ==='Easy'){
        if(isChecked){return styles.easyChecked; }
        else { return styles.easy;}
    }else if(difficulty ==='Medium'){
        if(isChecked) return styles.mediumChecked;
        else {return styles.medium;}
    }else if(difficulty ==='Hard'){
        if(isChecked) return styles.hardChecked;
        else return styles.hard;
    }else{
        return styles.normal;
    }
}

const Index = ({id, name, difficulty, handleRadioClick, isChecked}: RadioButtonProps)=> {
    return(
        <div className= 'radio'>
            <input className={styles.gone}
                type = 'radio'
                id = {id}
                name={name}
                value={difficulty}
                onChange={handleRadioClick}
            />
            <label className={`${getLabelColor(difficulty,isChecked)}`} htmlFor={id}>
                {difficulty}
            </label>
        </div>
    )
}

export default Index;
