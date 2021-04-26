import React from 'react';
import styles from './Input.module.css'

const Input = ({label, name, placeholder, type, value, onchange, onblur, disable, min}) => {

    return (
        <div className={styles.input_area}>
            <p>{label}</p>
            <input name={name} placeholder={placeholder} type={type} onBlur={onblur} disabled={disable}
                   onChange={onchange} value={value} min={min}/>
        </div>
    );
}

export default Input;