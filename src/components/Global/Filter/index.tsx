import React, {useState} from 'react';
import RadioButton from "../RadioButton";
import styles from "./Filter.module.scss"

const Index = () => {
    let checked;
    const [selectedRadioBtn, setSelectedRadioBtn] = useState(''); //state records for the radio set: which btm(value) is selected
    const handleRadioClick = (event)=>{
        if(event.target.checked === true){
            setSelectedRadioBtn(event.target.value);//event.target= (an object: the input tag with the value of radio1) radio1
            checked = true;
        }else{
            setSelectedRadioBtn('');
            event.target.checked = false;
            checked = false;
        }
    }
    return (
        <div >
            <form className={styles.filter}>
                <RadioButton id={'radioEasy'} name={'filter'} difficulty={'Easy'} handleRadioClick={handleRadioClick} isChecked={checked} />
                <RadioButton id={'radioMedium'} name={'filter'} difficulty={'Medium'} handleRadioClick={handleRadioClick} isChecked={checked} />
                <RadioButton id={'radioHard'} name={'filter'} difficulty={'Hard'} handleRadioClick={handleRadioClick} isChecked={checked} />
            </form>
        </div>
    );
};

export default Index;