import React, {useEffect, useState} from 'react';
import styles from './Payment.module.css'
import stylesOverall from './../../pages/checkout/Checkout.module.css'
import {useDispatch} from "react-redux";
import {addCheckOutParam} from "../../api";

const options = [
    {name: 'M-PESA', value: 'MPESA'}, {name: 'CASH ON DELIVERY', value: 'CASH'}, {name: 'VISA', value: 'VISA'}
]

function Payment({activateNext, index, checkout, next}) {

    const dispatch = useDispatch()
    const [mode, setMode] = useState('')
    const [button, setButton] = useState(true)
    const [expanded, setExpanded] = useState(false)

    const handlePaymentChange = payment => {
        setMode(payment.value)
        dispatch(addCheckOutParam({...checkout, payment: payment.value}))
    }

    useEffect(() => {
        mode ? setExpanded(false) : setExpanded(true)
    }, [mode])

    const nextStep = () => {
        setButton(false)
        activateNext(index)
    }

    const changeMethod = () => {
        if (!expanded) setExpanded(true)
    }

    const renderOption = () => (
        mode ? (<>
                <p>You chose <b>{options.find(option => option.value === mode)?.name}</b> as your payment method</p>
                <br/>
            </>
        ) : (
            <h5>How do you want to pay for your order</h5>
        )
    )

    return (
        <div className={styles.payment}>
            <div className={stylesOverall.header}>
                {mode ? (
                    <span className={stylesOverall.step_number}>&#10004;</span>
                ) : (
                    <span className={stylesOverall.step_number}>{index + 1}</span>
                )}
                <div className={stylesOverall.header_area}>
                    <h4>Payment Method</h4>
                    <span className={stylesOverall.btn_change} onClick={() => changeMethod()}>Change</span>
                </div>
            </div>
            <hr/>
            <div className={stylesOverall.content}>
                {renderOption()}
                {next !== null && next === index && (
                    <>
                        <div className={expanded ? `${styles.options} ${stylesOverall.expanded}` :
                            `${stylesOverall.un_expanded}`}>
                            {options.map(option => (
                                <span key={option.name}>
                                    <input type="radio" name='option' id='option' value={mode}
                                           checked={mode === option.value}
                                           onChange={() => handlePaymentChange(option)}/>
                                    <label htmlFor="option">{option.name}</label>
                                </span>
                            ))}
                        </div>
                        {button && (
                            <button className={stylesOverall.btn_next} onClick={() => nextStep()}>Next</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Payment;