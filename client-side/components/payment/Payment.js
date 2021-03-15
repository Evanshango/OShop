import React, {useState} from 'react';
import styles from './Payment.module.css'
import {useDispatch} from "react-redux";
import {addCheckOutParam} from "../../pages/api";

const options = [
    {name: 'M-PESA', value: 'MPESA'}, {name: 'CASH ON DELIVERY', value: 'CASH'}, {name: 'VISA', value: 'VISA'}
]

function Payment({selected, activateNext, index, checkout}) {
    const dispatch = useDispatch()
    const [mode, setMode] = useState(checkout && checkout.payment !== '' ? checkout.payment : '')

    const handlePaymentChange = payment => setMode(payment.value)

    const handleClick = () => {
        mode !== '' && dispatch(addCheckOutParam({...checkout, payment: mode}))
        activateNext(selected, index)
    }

    return (
        <div className={selected.active ? `${styles.payment} ${styles.active}` : `${styles.inactive}`}>
            <div className={styles.options}>
                {options.map(option => (
                    <span key={option.name}>
                        <input type="radio" name='option' id='option' value={mode} checked={mode === option.value}
                               onChange={() => handlePaymentChange(option)}/>
                        <label htmlFor="option">{option.name}</label>
                    </span>
                ))}
            </div>
            <button onClick={handleClick}>Proceed</button>
        </div>
    );
}

export default Payment;