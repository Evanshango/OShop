import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import styles from './Checkout.module.css'
import Billing from "../components/billing/Billing";
import Shipping from "../components/shipping/Shipping";
import Payment from "../components/payment/Payment";
import _ from 'lodash'

let steps = [
    {name: 'Billing', active: false,}, {name: 'Shipping', active: false,}, {name: 'Payment', active: false,}
]

function Checkout() {
    const [order, setOrder] = useState({})
    const [selected, setSelected] = useState({...steps[0], active: true})

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
        const ind = index + 1 === steps.length ? 0 : index + 1
        steps[ind].active = true
        setSelected(steps[ind])
    }

    // useEffect(() => {
    //     const totalSteps = steps.length
    //     const currInd = steps.findIndex((step) => step.name === selected.name)
    //
    //     const nextInd = currInd + 1 >= totalSteps ? 0 : currInd + 1
    //     // console.log(currInd)
    //
    //     // if (!selected.active) {
    //     //     setSelected({...steps[nextInd], active: true})
    //     //     // setSelected({...steps[nextInd], active: !selected.active})
    //     // }
    // }, [selected])

    const total = Object.values(products).reduce((acc, curr) => acc + (curr.units * curr.finalPrice), 0)

    useEffect(() => {
        let orders = []
        Object.values(products).forEach(({id, units, finalPrice}) => orders.push({
            id, units, price: finalPrice, totalPrice: units * finalPrice
        }))
        setOrder({amount: total, orders})
    }, [products, selected])

    const renderContent = step => ((() => {
        switch (step.name) {
            case 'Billing':
                return selected && selected.name === steps[0].name &&
                    <Billing selected={selected} activateNext={activateNext} index={0}/>
            case 'Shipping':
                return selected && selected.name === steps[1].name &&
                    <Shipping selected={selected} activateNext={activateNext} index={1}/>
            case 'Payment':
                return selected && selected.name === steps[2].name &&
                    <Payment selected={selected} activateNext={activateNext} index={2}/>
        }
    })())

    return (
        <div className={styles.checkout_container}>
            <div className={styles.steps}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.step}>
                        <div className={styles.step_header} onClick={() => handleClick(step)}>
                            <span className={styles.step_number}>{index + 1}</span>
                            <h3>{step.name}</h3>
                            <span>Edit</span>
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
            </div>
        </div>
    );
}

export default Checkout;