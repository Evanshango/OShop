import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './Checkout.module.css'
import Billing from "../components/billing/Billing";
import Shipping from "../components/shipping/Shipping";
import Payment from "../components/payment/Payment";
import _ from 'lodash'
import {addOrder} from "./api";
import Link from "next/link";

let steps = [
    {name: 'Signin', active: false},
    {name: 'Delivery Address', active: false},
    {name: 'Payment', active: false}
]

function Checkout({user}) {
    const dispatch = useDispatch()
    const [order, setOrder] = useState({})
    const [selected, setSelected] = useState(user !== {} ? {...steps[1], active: true} : {...steps[0], active: true})
    const {checkout} = useSelector(state => state.checkout)

    const {products} = useSelector(state => state.cart)

    const handleClick = step => {
        let option
        if (!_.isEmpty(selected)) {
            if (step.name === selected.name) option = {...selected, active: !selected.active}
            else option = {...step, active: !selected.active}
        } else {
            option = {...step, active: !step.active}
        }
        setSelected(option)
    }

    const activateNext = (option, index) => {
        const ind = index + 1 === steps.length ? (user !== {} ? 1 : 0) : index + 1
        steps[ind].active = true
        setSelected(steps[ind])
    }

    const total = Object.values(products).reduce((acc, curr) => acc + (curr.units * curr.finalPrice), 0)

    useEffect(() => {
        let items = []
        Object.values(products).forEach(({id, units, finalPrice}) => items.push({
            product: id, units, price: finalPrice, totalPrice: units * finalPrice
        }))
        setOrder({amount: total, items})
    }, [products, selected, checkout])

    const finishOrder = () => {
        let status = checkout.payment === 'VISA' || checkout.payment === 'MPESA' ? 'COMPLETED' : 'PENDING'
        const readyOrder = {
            ...order,
            address: checkout.address,
            paymentMethod: checkout.payment,
            paymentStatus: status,
            amount: total
        }
        dispatch(addOrder(readyOrder))
    }

    const renderContent = step => ((() => {
        switch (step.name) {
            case 'Signin':
                return selected && selected.name === steps[0].name && _.isEmpty(user) &&
                    <Billing selected={selected} activateNext={activateNext} index={0} user={user}/>
            case 'Delivery Address':
                return selected && selected.name === steps[1].name &&
                    <Shipping selected={selected} activateNext={activateNext} index={1} user={user}
                              checkout={checkout}/>
            case 'Payment':
                return selected && selected.name === steps[2].name &&
                    <Payment selected={selected} activateNext={activateNext} index={2} user={user} checkout={checkout}/>
        }
    })())

    return (
        <>
            {!_.isEmpty(products) ? (
                <div className={styles.checkout_container}>
                    <div className={styles.steps}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.step}>
                                <div className={styles.step_header} onClick={() => handleClick(step)}>
                                    <span className={styles.step_number}>{index + 1}</span>
                                    <h3>{step.name.toUpperCase()}</h3>
                                    {step.name === 'Signin' && !_.isEmpty(user) && user.email}
                                </div>
                                <hr/>
                                {renderContent(step)}
                            </div>
                        ))}
                    </div>
                    <div className={styles.order_summary}>
                        <div className={styles.summary}>
                            <div className={styles.summary_header}>
                                <h3>Order summary</h3>
                                <span>Edit</span>
                            </div>
                            {products && Object.values(products).map(c => (
                                <div className={styles.items} key={c.id}>
                                    <h5>{c.name}</h5>
                                    <h5>x{c.units}</h5>
                                    <h5>{c.finalPrice.toFixed(2)}</h5>
                                </div>
                            ))}
                            <hr/>
                            <h4>Shipping charges and taxes will be calculated when an address is provided</h4>
                            <div className={styles.total}>
                                <h3>Total</h3>
                                <h4><small>Ksh.</small> {total.toFixed(2)}</h4>
                            </div>
                        </div>
                        {checkout && checkout.address && checkout.address !== '' && checkout.payment && checkout.payment !== ''
                        && (
                            <button className={styles.complete_button} onClick={finishOrder}>Complete</button>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.no_content}>
                    <div className={styles.no_items}>
                        <h2>You don't have any items in your cart to check out</h2>
                        <div className={styles.action_buttons}>
                            <li>
                                <Link href={'/products'}>
                                    <a>Click to Shop</a>
                                </Link>
                            </li>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Checkout;