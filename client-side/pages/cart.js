import Link from "next/link";
import styles from './Cart.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {deleteCartItem, updateCartUnits} from "./api";
import _ from 'lodash'
import React from "react";

const Cart = ({user}) => {
    const dispatch = useDispatch()
    const {products: cart} = useSelector(state => state.cart)

    const totalPrice = cart.reduce((acc, curr) => acc + (curr.units * curr.product.finalPrice), 0) //Get total items price

    const addItemUnits = prod => dispatch(updateCartUnits(prod.id, prod.units + 1))

    const reduceCartUnits = prod => {
        if (prod.units !== 1) {
            dispatch(updateCartUnits(prod.id, prod.units - 1))
        }
    }

    const removeItem = prod => dispatch(deleteCartItem(prod.id))

    const showImage = (images) => <img src={images[Math.floor(Math.random() * images.length)]} alt=""/>

    return (
        <div className={styles.cart}>
            {cart.length > 0 ? (
                <>
                    <div className={styles.table_area}>
                        <table className={styles.cart_table}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                                <th>Subtotal (Ksh)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart && cart.map((prod, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className={styles.prod_info}>
                                        {prod.product.images.length > 0 && showImage(prod.product.images)}
                                        <div className={styles.prod_desc}>
                                            <h4>{prod.product.name}</h4>
                                            <h6>{prod.product.finalPrice.toLocaleString()}</h6>
                                            <button onClick={() => removeItem(prod)}>Remove</button>
                                        </div>
                                    </td>
                                    <td>{prod.units} * {prod.product.finalPrice.toLocaleString()}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <AiOutlinePlus onClick={() => addItemUnits(prod)}/>
                                            <AiOutlineMinus onClick={() => reduceCartUnits(prod)}/>
                                        </div>
                                    </td>
                                    <td>{(prod.units * prod.product.finalPrice).toLocaleString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.sub_total}>
                        <div className={styles.sub_total_info}>
                            <p>Subtotal</p>
                            <h4><span>Ksh.</span> {totalPrice.toLocaleString()}</h4>
                        </div>
                        <li>
                            <Link href={'/checkout'}>
                                <a>Proceed</a>
                            </Link>
                        </li>
                    </div>
                </>
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