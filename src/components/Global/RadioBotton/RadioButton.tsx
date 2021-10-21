import styles from './RadioButton.module.scss';

type RadioButtonProps = {
    id: string, /*radioEasy*/
    name: string, /*fliter*/
    value: string, /*Easy*/
    color: string,
}

const RadioButton = ({id, name, value, color}: RadioButtonProps)=> {

    return(
        <div className= 'radio'>
            <input
                type = 'radio'
                id = {id}
                name={name}
                value={value}
            />
            <label
                htmlFor={id}>{value}
                style="background-color:{color};"
            </label>
        </div>
    )
}

export default RadioButton;
