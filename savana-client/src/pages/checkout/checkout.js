import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {addOrder} from '../../api'
import Shipping from "../../components/shipping/Shipping"
import Payment from "../../components/payment/Payment"
import {Step, StepLabel, Stepper} from "@material-ui/core"
import styles from './Checkout.module.css'
import Auth from "../../components/auth/Auth"
import _ from "lodash"
import {Breadcrumb} from "react-bootstrap"
import {Link} from "react-router-dom"

function Checkout() {
    const dispatch = useDispatch()
    const [order, setOrder] = useState({})

    const {checkout} = useSelector(state => state.checkout)
    const {products} = useSelector(state => state.cart)
    // const {payment} = useSelector(state => state.paypal)
    const {latest, orders} = useSelector(state => state.order)
    const {user} = useSelector(state => state.current)
    const {token} = useSelector(state => state.auth)
    const [activeStep, setActiveStep] = useState(token !== '' ? (!_.isEmpty(latest) ? 2 : 1) : 0)

    const total = Object.values(products).reduce((acc, curr) => acc + (curr.units * curr.finalPrice), 0)

    useEffect(() => {
        let items = []
        Object.values(products).forEach(({id, units, finalPrice}) => items.push({
            product: id, units, price: finalPrice, totalPrice: units * finalPrice
        }))

        setActiveStep(token !== '' ? (!_.isEmpty(latest) ? 2 : 1) : 0)

        setOrder({amount: total, items})
    }, [products, checkout, token, total, latest])

    const finishOrder = () => {
        const readyOrder = {...order, address: checkout.address, amount: total}
        dispatch(addOrder(readyOrder))
    }

    const getSteps = () => ['Signin to your Account', 'Choose a delivery address', 'Make your payment']

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <Auth clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}/>
            case 1:
                return <Shipping index={1} checkout={checkout} order={order} finishOrder={finishOrder}/>
            case 2:
                return <Payment index={2} user={user} checkout={checkout}/>
            default:
                return 'Unknown stepIndex'
        }
    }

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const handleReset = () => setActiveStep(0)

    return (
        <div className={styles.checkout_container}>
            {orders && orders.length > 0 ? (
                <p>checking orders</p>
            ) : (
                <>
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
                        </Breadcrumb>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {getSteps().map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {activeStep === getSteps().length ? (
                                <div>
                                    <p>All steps completed</p>
                                    <button onClick={handleReset}>Reset</button>
                                </div>
                            ) : (
                                <div>
                                    <div style={{minHeight: '50vh'}}>{getStepContent(activeStep)}</div>
                                    {!_.isEmpty(user) && (
                                        <div className={styles.stepper_buttons}>
                                            <button disabled={!_.isEmpty(user) ? activeStep === 1 : activeStep === 0}
                                                    onClick={handleBack}>Back
                                            </button>
                                            <button onClick={handleNext} disabled={activeStep === 1 && _.isEmpty(latest)}>
                                                {activeStep === getSteps().length - 1 ? 'Finish' : 'Next'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.order_summary}>
                        <div className={styles.summary}>
                            <div className={styles.summary_header}>
                                <h4>
                                    Order summary {' '}
                                    <small>
                                        ({products && Object.values(products).length} items)
                                    </small>
                                </h4>
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
                            <h6>Shipping charges and taxes will be calculated when an address is provided</h6>
                            <div className={styles.total}>
                                <h4>Total</h4>
                                <h5><small>$</small> {total.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
        // <>
        //     {!_.isEmpty(payment) ? (
        //         <div className={styles.order_content}>
        //             <div className={styles.order_info}>
        //                 <AiOutlineCheckCircle/>
        //                 <h3>Thank you</h3>
        //                 <p>Congratulations, your order has been placed</p>
        //                 <p>
        //                     Your payment reference is <small style={{color: 'red'}}>{`#${payment.paymentRef}`}</small>
        //                 </p>
        //                 <div className={styles.buttons}>
        //                     <li className={styles.btn_keep_shopping}>
        //                         <Link to={'/products'}>
        //                             <span>Keep Shopping</span>
        //                         </Link>
        //                     </li>
        //                     <li className={styles.view_orders}>
        //                         <Link to={'/account'}>
        //                             <span>View Orders</span>
        //                         </Link>
        //                     </li>
        //                 </div>
        //             </div>
        //         </div>
        //     ) : (
        //         <>
        //             ) : (
        //                 <div className={styles.no_content}>
        //                     <div className={styles.no_items}>
        //                         <h2>You don't have any items to check out</h2>
        //                         <div className={styles.action_buttons}>
        //                             <li className={styles.view_orders}>
        //                                 <Link to={'/products'}>
        //                                     <span>Click to Shop</span>
        //                                 </Link>
        //                             </li>
        //                         </div>
        //                     </div>
        //                 </div>
        //             )}
        //         </>
        //     )}
        // </>
    )
}

export default Checkout
