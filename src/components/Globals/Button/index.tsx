import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
    type: 'primary' | 'secondary' | 'outline',
    content: string,
    arrowDirection?: 'right' | 'down'
}

const getButtonClass = (type: string) => {
    if (type === 'primary') {
        return styles.btnPrimary
    } else if (type === 'secondary') {
        return styles.btnSecondary
    } else if (type === 'outline') {
        return styles.btnOutline
    } else {
        return null
    }
}

const Button = ({type, content, arrowDirection}: ButtonProps) => {
    return (
        <button className={`${getButtonClass(type)}`}>
            <div className={styles.btnFlexContent}>
                <div className={styles.btnTextContainer}>
                    {content}
                </div>
                {arrowDirection &&
                <div className={styles.arrowBox}>

                </div>
                }
            </div>
        </button>
    );
};

export default Button;
