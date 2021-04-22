import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import styles from './Payment.module.css'
import stylesOverall from './../../pages/checkout/Checkout.module.css'
import {useDispatch, useSelector} from "react-redux"
import {paypalPayment} from "../../api"
import mPesa from '../../assets/images/mpesa.jpg'
import {Dialog, DialogContent} from "@material-ui/core"
import _ from 'lodash'

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
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const handleClose = () => setOpen(false)

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

    const renderOpt = opt => ((() => {
        switch (opt.name) {
            case 'M-PESA':
                return (
                    <>
                        <div className={styles.mpesa} onClick={() => setOpen(true)}>
                            <img src={mPesa} alt="mpesa"/>
                        </div>
                        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                            <DialogContent>
                                <h3 style={{color: 'red', textAlign: 'center'}}>Coming soon!!</h3>
                            </DialogContent>
                        </Dialog>
                    </>
                )
            case 'PAYPAL':
                return (
                    <>
                        <PayPalButton style={{color: 'gold', shape: 'pill'}} onCancel={({orderID}) => onCancel(orderID)}
                                      createOrder={(data, actions) => createOrder(data, actions)}
                                      onApprove={(data, actions) => onApprove(data, actions)}/>
                    </>
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
                    <h5>How do you want to pay for your order
                        {!_.isEmpty(order) && (<span style={{
                                textTransform: 'uppercase', fontSize: '1.2rem',
                                color: 'red', marginLeft: '.5rem'
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
