import React, {useEffect, useState} from 'react'
import styles from './Cart.module.css'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import _ from "lodash"
import {MdHourglassEmpty} from "react-icons/md"
import {addCartItem} from "../../api"
import CartItem from "../../components/cart-item/CartItem"
import {Breadcrumb, Table} from "react-bootstrap"

function Cart() {
    const dispatch = useDispatch()
    const {products: cart} = useSelector(state => state.cart)
    const {products} = useSelector(state => state.product)
    const {token} = useSelector(state => state.auth)
    const {user} = useSelector(state => state.current)
    const [cartItems, setCartItems] = useState(cart)

    useEffect(() => {
        setCartItems(cart)
    }, [cart])

    //Get total items price
    const totalPrice = cartItems && Object.values(cartItems)
        .reduce((acc, curr) => acc + (curr.units * curr.finalPrice), 0)

    const incrementQty = (prod) => updateCartUnits(prod, 1)

    const decrementQty = (prod) => updateCartUnits(prod, -1)

    const updateCartUnits = (prod, qty) => {
        const {id, images, finalPrice, name} = prod
        const item = {id, images, finalPrice, name}
        dispatch(addCartItem(item, qty, token))
    }

    const showCheckOutBtn = () => ((() => {
        let itemsArray = []
        Object.values(cart).forEach(item => {
            const prod = products.find(p => p.id === item.id)
            prod && itemsArray.push(prod)
        })
        const prods = itemsArray.filter(pr => pr.stock < 1)
        return prods.length > 0 ? (
            <p className={styles.warning}>Please remove items that are out of stock before checkout</p>
        ) : (
            <Link to={'/checkout'}>
                <button className="btn btn-outline-danger w-100">
                    Proceed to checkout
                </button>
            </Link>
        )
    })())

    return (
        <div className={styles.cart}>
            <div style={{width: '100%'}}>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: '/products'}}>Products</Breadcrumb.Item>
                    <Breadcrumb.Item active>Cart</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {Object.keys(cartItems).length > 0 ? (
                <div className={styles.cart_holder}>
                    <div>
                        <Table striped responsive style={{margin: '1rem 0'}}>
                            <thead className='thead-light'>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price per Unit</th>
                                <th style={{textAlign: 'center'}}>Units</th>
                                <th style={{textAlign: 'center'}}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(cartItems).map((key, index) => (
                                <tr key={index}>
                                    <CartItem product={cartItems[key]} incQty={incrementQty} decQty={decrementQty}/>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className={styles.order_summary}>
                        <h5 className={styles.summary_header}>Order Summary</h5>
                        <p style={{fontStyle: 'italic'}}>
                            Shipping costs will be added depending on the choices made during checkout.
                        </p>
                        <div className={styles.item_info}>
                            <h6 className={styles.info_title}>Order subtotal</h6>
                            <h6>${totalPrice.toFixed(2)}</h6>
                        </div>
                        <hr/>
                        <div className={styles.item_info}>
                            <h6 className={styles.info_title}>Shipping and handling</h6>
                            <h6>$0.00</h6>
                        </div>
                        <hr/>
                        <div className={styles.item_info}>
                            <h6 className={styles.info_title}>Total</h6>
                            <h6>${totalPrice.toFixed(2)}</h6>
                        </div>
                        <hr/>
                        {showCheckOutBtn()}
                    </div>
                </div>
            ) : (
                <div className={styles.no_items}>
                    <MdHourglassEmpty/>
                    <h3>You don't have any items in your cart...</h3>
                    <div className={styles.action_buttons}>
                        <li>
                            <Link to={'/products'}>
                                <span>View Products</span>
                            </Link>
                        </li>
                        {_.isEmpty(user) && (
                            <li className={styles.signin}>
                                <Link to={'/account'}>
                                    <span>Click to Signin</span>
                                </Link>
                            </li>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
