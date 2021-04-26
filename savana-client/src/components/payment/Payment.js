import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import styles from './Payment.module.css'
import stylesOverall from './../../pages/checkout/Checkout.module.css'
import {useDispatch, useSelector} from "react-redux"
import {clearMpesaPayErrors, makeMpesaPayment, paypalPayment} from "../../api"
import {Dialog, DialogActions} from "@material-ui/core"
import _ from 'lodash'
import mPesaLogo from '../../assets/images/mpesa..svg'
import Previous from "../order/Previous"
import Input from "../input/Input"

const PayPalButton = window.paypal.Buttons['driver']('react', {React, ReactDOM})

const options = [
    {name: 'M-PESA', value: 'MPESA'},
    {name: 'PAYPAL', value: 'PAYPAL'},
    {name: 'CASH ON DELIVERY', value: 'CASH'},
    {name: 'VISA', value: 'VISA'}
]

function Payment() {

    const {latest} = useSelector(state => state.order)
    const [order, setOrder] = useState(!_.isEmpty(latest) ? latest : {})
    const {errors, loading} = useSelector(state => state.payment)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState('')

    const handleClose = () => {
        errors.length > 0 && dispatch(clearMpesaPayErrors())
        setOpen(false)
        setPhone('')
        setPhoneError('')
    }

    useEffect(() => {
        setOrder(!_.isEmpty(latest) ? latest : {})
    }, [latest])

    const createOrder = async (dt, actions) => {
        return actions.order.create({
            purchase_units: [{
                reference_id: order.id,
                amount: {
                    value: Math.round(order.amount / 100),
                    currency_code: 'USD',
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: (Math.round(order.amount / 100)).toString()
                        },
                        shipping: {
                            currency_code: "USD",
                            value: "0.00"
                        },
                        handling: {
                            currency_code: "USD",
                            value: "0.00"
                        },
                        tax_total: {
                            currency_code: "USD",
                            value: "0.00"
                        },
                        shipping_discount: {
                            currency_code: "USD",
                            value: "0.00"
                        }
                    }
                }
            }],
            application_context: {
                shipping_preference: 'NO_SHIPPING'
            }
        })
    }

    const onApprove = (dt, actions) => {
        return actions.order.capture().then(async (details) => {
            const {id, payer, purchase_units} = details
            const payment = {
                paymentRef: id,
                payerEmail: payer.email_address,
                payerId: payer.payer_id,
                payerName: `${payer.name.given_name} ${payer.name.surname}`,
                amount: purchase_units[0].amount.value,
                order: purchase_units[0].reference_id,
                currency: purchase_units[0].amount.currency_code,
                method: 'PAYPAL'
            }
            dispatch(paypalPayment(payment))
        })
    }

    const onCancel = (orderID) => {
        if (orderID !== '') {
            console.log('Payment process cancelled')
        }
    }

    const makeRequest = () => {
        dispatch(makeMpesaPayment(phone, latest.amount, latest.id))
    }

    const handleChange = e => {
        setPhone(e.currentTarget.value)
        setPhoneError('')
    }

    const formatPhone = () => {
        let formattedPhone
        if (phone !== '') {
            if (phone.includes(254)) {
                formattedPhone = phone
            }
            if (phone.startsWith(0) || phone.includes('+')) {
                formattedPhone = `254${phone.substring(1, 10)}`
            }
            if (formattedPhone !== undefined) {
                if (formattedPhone.length < 12 || formattedPhone.length > 12) {
                    setPhoneError('Please enter a valid phone number')
                    return
                }
            }

            const char = formattedPhone !== undefined && formattedPhone.charAt(4)
            const invalidChars = ['7', '8', '6']
            if (invalidChars.includes(char)) {
                setPhoneError('Please enter a valid MPesa number')
                return
            }
            setPhone(formattedPhone)
        } else {
            setPhone('')
        }
    }

    const renderOpt = opt => ((() => {
        switch (opt.name) {
            case 'M-PESA':
                return (
                    <>
                        <div className={styles.payment_buttons}>
                            <img src={mPesaLogo} alt="mpesa" onClick={() => setOpen(true)}/>
                        </div>
                        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                            <div style={{padding: '1rem'}}>
                                <h5>MPESA</h5>
                                <Input name={'phone'} type={'number'} onblur={formatPhone}
                                       label={'Enter your preferred MPESA Number to pay for your order'}
                                       placeholder={'0712345678'} onchange={handleChange} value={phone}/>
                                {loading && <p style={{color: 'green', padding: '1rem'}}>Please wait...</p>}
                                {phoneError !== '' && (
                                    <p style={{color: 'red', marginTop: '1rem'}}>{phoneError}</p>
                                )}
                                {errors.length > 0 && (
                                    <div className={styles.errors}>
                                        {errors.map((error, index) => <li key={index}>{error.message}</li>)}
                                    </div>
                                )}
                                <DialogActions>
                                    <button onClick={makeRequest} className={styles.make_request}
                                            disabled={phone === '' || phoneError !== '' || errors.length > 0}>
                                        Make Request
                                    </button>
                                </DialogActions>
                            </div>
                        </Dialog>
                    </>
                )
            case 'PAYPAL':
                return (
                    <div className={styles.payment_buttons}>
                        <PayPalButton style={{color: 'gold', shape: 'pill', height: 47}}
                                      onCancel={({orderID}) => onCancel(orderID)}
                                      createOrder={(data, actions) => createOrder(data, actions)}
                                      onApprove={(data, actions) => onApprove(data, actions)}/>
                    </div>
                )
            case 'VISA':
                return <></>
            case 'CASH ON DELIVERY':
                return <></>
            default:
            //do nothing
        }
    })())

    return (
        <div className={styles.payment}>
            <div className={stylesOverall.header}>
                <div className={stylesOverall.header_area}>
                    <h4>Payment Method</h4>
                </div>
            </div>
            <hr/>
            {!_.isEmpty(order) && (
                <div className={stylesOverall.content}>
                    <div>
                        {latest && (
                            <>
                                <p>({latest.items.length} Previous order items)</p>
                                <Previous latest={latest.items}/>
                            </>
                        )}
                    </div>
                    <h5 style={{marginTop: '2rem'}}>How do you want to pay for your order
                        {!_.isEmpty(order) && (
                            <span style={{
                                textTransform: 'uppercase', fontSize: '1.2rem', color: 'red', marginLeft: '.5rem'
                            }}>
                                {`#${order.id}`}
                            </span>
                        )}
                    </h5>
                    <div className={styles.options}>
                        {options.map(option => (
                            <span key={option.name}>
                                    {renderOpt(option)}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Payment
