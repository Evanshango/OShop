import Link from "next/link";
import styles from './Cart.module.css'
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash'
import React, {useEffect, useState} from "react";
import CartItem from "../components/cart/CartItem";
import {addCartItem} from "./api";

const Cart = ({user}) => {
    const dispatch = useDispatch()
    const {products: cart} = useSelector(state => state.cart)
    const {token} = useSelector(state => state.user)
    const [cartItems, setCartItems] = useState(cart)

    useEffect(() => {
        setCartItems(cart)
    }, [cart])

    //Get total items price
    const totalPrice = Object.values(cartItems).reduce((acc, curr) => acc + (curr.units * curr.finalPrice), 0)

    const incrementQty = (prod) => updateCartUnits(prod, 1)

    const decrementQty = (prod) => updateCartUnits(prod, -1)

    const updateCartUnits = (prod, qty) => {
        const {id, images, finalPrice, name} = prod
        const item = {id, images, finalPrice, name}
        dispatch(addCartItem(item, qty, token))
    }

    return (
        <div className={styles.cart}>
            {Object.keys(cartItems).length > 0 ? (
                <div className={styles.cart_area}>
                    <div className={styles.cart_right}>
                        <div className={styles.cart_header}>
                            <h4>My Cart</h4>
                            <h4>Delivery</h4>
                        </div>
                        <hr/>
                        {Object.keys(cartItems).map((key, index) => (
                            <CartItem product={cartItems[key]} key={index} incQty={incrementQty} decQty={decrementQty}/>
                        ))}
                        <li>
                            <Link href={'/checkout'}>
                                <a>
                                    <div className={styles.buy_now}>By Now</div>
                                </a>
                            </Link>
                        </li>
                    </div>
                    <div className={styles.cart_left}>
                        <div className={styles.cart_header}>
                            <h4>Product</h4>
                            <h4>Delivered to</h4>
                        </div>
                        <hr/>
                        <div className={styles.sub_total_info}>
                            <p>Subtotal</p>
                            <h4><span>Ksh.</span> {totalPrice.toLocaleString()}</h4>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.no_items}>
                    <h3>You don't have any items in your cart...</h3>
                    <div className={styles.action_buttons}>
                        <li>
                            <Link href={'/products'}>
                                <a>Click to Shop</a>
                            </Link>
                        </li>
                        {_.isEmpty(user) && (
                            <li>
                                <Link href={'/account'}>
                                    <a className={styles.signin}>Click to Signin</a>
                                </Link>
                            </li>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;