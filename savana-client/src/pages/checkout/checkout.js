import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './Checkout.module.css'
import _ from 'lodash'
import {addOrder} from '../../api';
import {AiOutlineCheckCircle} from "react-icons/ai";
import {Link} from "react-router-dom";
import Signin from "../../components/signin/Signin";
import Shipping from "../../components/shipping/Shipping";
import Payment from "../../components/payment/Payment";

let steps = [
    {name: 'Signin', value: 'signedIn', active: false},
    {name: 'Delivery Address', value: 'address', active: false},
    {name: 'Payment Method', value: 'payment', active: false}
]

function Checkout() {
    const dispatch = useDispatch()
    const [order, setOrder] = useState({})
    const [nextIndex, setNextIndex] = useState(null)
    const [showCheckout, setShowCheckout] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    const {checkout} = useSelector(state => state.checkout)
    const {products} = useSelector(state => state.cart)
    const {loading, errors} = useSelector(state => state.order)
    const {user} = useSelector(state => state.current)

    const activateNext = (index) => {
        const ind = index + 1 === steps.length ? (!_.isEmpty(user) ? 1 : 0) : index + 1
        index + 1 === steps.length ? setShowCheckout(true) : setNextIndex(ind)
    }

    const total = Object.values(products).reduce((acc, curr) => acc + (curr.units * curr.finalPrice), 0)

    useEffect(() => {
        let items = []
        Object.values(products).forEach(({id, units, finalPrice}) => items.push({
            product: id, units, price: finalPrice, totalPrice: units * finalPrice
        }))

        setOrder({amount: total, items})
    }, [products, checkout, user, total])

    const finishOrder = async () => {
        let status = checkout.payment === 'VISA' || checkout.payment === 'MPESA' ? 'COMPLETED' : 'PENDING'
        const readyOrder = {
            ...order,
            address: checkout.address,
            paymentMethod: checkout.payment,
            paymentStatus: status,
            amount: total
        }
        dispatch(addOrder(readyOrder))

        !loading && errors.length === 0 ? setOrderSuccess(true) : setOrderSuccess(false)
    }

    const renderContent = step => ((() => {
        switch (step.name) {
            case 'Signin':
                return <Signin activateNext={activateNext} index={0} user={user}
                               clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} next={nextIndex}/>
            case 'Delivery Address':
                return <Shipping activateNext={activateNext} index={1} user={user} checkout={checkout}
                                 next={nextIndex}/>
            case 'Payment Method':
                return <Payment activateNext={activateNext} index={2} user={user} checkout={checkout} next={nextIndex}/>
            default:
            // do nothing
        }
    })())

    return (
        <>
            {orderSuccess ? (
                <div className={styles.order_content}>
                    <div className={styles.order_info}>
                        <AiOutlineCheckCircle/>
                        <h3>Thank you</h3>
                        <p>Congratulations, your order has been placed</p>
                        <div className={styles.buttons}>
                            <li className={styles.btn_keep_shopping}>
                                <Link to={'/products'}>
                                    <span>Keep Shopping</span>
                                </Link>
                            </li>
                            <li className={styles.view_orders}>
                                <Link to={'/account'}>
                                    <span>View Orders</span>
                                </Link>
                            </li>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {!_.isEmpty(products) ? (
                        <div className={styles.checkout_container}>
                            <div className={styles.steps}>
                                {steps.map((step, index) => (
                                    <div key={index} className={styles.step}>
                                        {renderContent(step)}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.order_summary}>
                                <div className={styles.summary}>
                                    <div className={styles.summary_header}>
                                        <h3>
                                            Order summary
                                            <small>
                                                ({products && Object.values(products).length} items)
                                            </small>
                                        </h3>
                                        <li>
                                            <Link to={'/cart'}>
                                                <span>Edit</span>
                                            </Link>
                                        </li>
                                    </div>
                                    {products && Object.values(products).length > 0 && Object.values(products).map(c => (
                                        <div className={styles.items} key={c.id}>
                                            <h5>{c.name}</h5>
                                            <h5>x{c.units}</h5>
                                            <h5>{c.finalPrice?.toFixed(2)}</h5>
                                        </div>
                                    ))}
                                    <hr/>
                                    <h4>Shipping charges and taxes will be calculated when an address is provided</h4>
                                    <div className={styles.total}>
                                        <h3>Total</h3>
                                        <h4><small>Ksh.</small> {total.toFixed(2)}</h4>
                                    </div>
                                </div>
                                {showCheckout && (
                                    <button className={styles.complete_button} onClick={finishOrder}>Complete</button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.no_content}>
                            <div className={styles.no_items}>
                                <h2>You don't have any items to check out</h2>
                                <div className={styles.action_buttons}>
                                    <li>
                                        <Link to={'/products'}>
                                            <span>Click to Shop</span>
                                        </Link>
                                    </li>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Checkout;