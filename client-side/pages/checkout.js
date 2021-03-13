import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import styles from './Checkout.module.css'
import Billing from "../components/billing/Billing";
import Shipping from "../components/shipping/Shipping";
import Payment from "../components/payment/Payment";

const steps = ['Billing', 'Shipping', 'Payment']

function Checkout() {
    const [order, setOrder] = useState({})
    const [open, setOpen] = useState(false)
    const {products} = useSelector(state => state.cart)

    const total = Object.values(products).reduce((acc, curr) => acc + (curr.units * curr.finalPrice), 0)

    useEffect(() => {

        let orders = []
        Object.values(products).forEach(({id, units, finalPrice}) => orders.push({
            id, units, price: finalPrice, totalPrice: units * finalPrice
        }))
        setOrder({amount: total, orders})
    }, [products])

    const submitOrder = e => {
        e.preventDefault()
        console.log(order)
    }

    const renderContent = step => (
        (() => {
            switch (step) {
                case 'Billing':
                    return <Billing open={open} setOpen={setOpen}/>
                case 'Shipping':
                    return <Shipping open={open} setOpen={setOpen}/>
                case 'Payment':
                    return <Payment open={open} setOpen={setOpen}/>
            }
        })()
    )

    return (
        <div className={styles.checkout_container}>
            <div className={styles.steps}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.step}>
                        <div className={styles.step_header}>
                            <span className={styles.step_number}>{index + 1}</span>
                            <h3>{step}</h3>
                            <span>Edit</span>
                        </div>
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