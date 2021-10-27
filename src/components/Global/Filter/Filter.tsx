import React, {useState} from 'react';
import RadioButton from "../RadioBotton/RadioButton";
import styles from "./Filter.module.scss"

const Filter = () => {
    let isSelected = false;
    const [selectedRadioBtn, setSelectedRadioBtn] = useState(''); //state records for the radio set: which btm(value) is selected
    const handleRadioClick = (event)=>{
        if(event.target.checked === true){
            setSelectedRadioBtn(event.target.value);//event.target= (an object: the input tag with the value of radio1) radio1
            isSelected = true;
        }else{
            setSelectedRadioBtn('');
            event.target.checked = false;
            isSelected = false;
        }
    }
    return (
        <div className={styles.filter}>
            <RadioButton id={'radioEasy'} name={'filter'} difficulty={'Easy'} handleRadioClick={handleRadioClick} isChecked={isSelected} />
            <RadioButton id={'radioMedium'} name={'filter'} difficulty={'Medium'} handleRadioClick={handleRadioClick} isChecked={isSelected} />
            <RadioButton id={'radioHard'} name={'filter'} difficulty={'Hard'} handleRadioClick={handleRadioClick} isChecked={isSelected} />
        </div>
    );
};

export default Filter;