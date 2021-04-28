import React from 'react';
import styles from './Input.module.css'
import {Form} from "react-bootstrap"

const Input = ({label, name, placeholder, type, value, onchange, onblur, disable, min}) => {

    return (
        <div className={styles.input_area}>
            <p>{label}</p>
            <input name={name} placeholder={placeholder} type={type} onBlur={onblur} disabled={disable}
                   onChange={onchange} value={value} min={min}/>
        </div>
    );
}

const DisabledField = ({value, onchange, label}) => {
    return(
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control value={value} disabled onChange={onchange}/>
        </Form.Group>
    )
}

export {Input, DisabledField};
