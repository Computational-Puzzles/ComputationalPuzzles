import React from 'react';
import RadioButton from "../RadioBotton/RadioButton";
import styles from "./Filter.module.scss"

const Filter = () => {
    return (
        <div >
            <RadioButton id={'radioEasy'} name={'filter'} difficulty={'Easy'} />
            <RadioButton id={'radioMedium'} name={'filter'} difficulty={'Medium'} />
            <RadioButton id={'radioHard'} name={'filter'} difficulty={'Hard'} />
        </div>
    );
};

export default Filter;