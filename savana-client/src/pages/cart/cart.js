import React, {useEffect, useState} from 'react';
import styles from './Cart.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import _ from "lodash";
import {MdHourglassEmpty} from "react-icons/md";
import {addCartItem} from "../../api";
import CartItem from "../../components/cart-item/CartItem";
import {Breadcrumb} from "react-bootstrap"

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
            <li>
                <Link to={'/checkout'}>
                    <span>
                        <div className={styles.buy_now}>Checkout</div>
                    </span>
                </Link>
            </li>
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
                <div className={styles.cart_area}>
                    <div className={styles.cart_right}>
                        <div className={styles.cart_header}>
                            <h5>My Cart</h5>
                            <h5>Availability</h5>
                        </div>
                        <hr/>
                        {Object.keys(cartItems).map((key, index) => (
                            <div key={index}>
                                <CartItem product={cartItems[key]} incQty={incrementQty} decQty={decrementQty}/>
                                {index + 1 !== Object.keys(cartItems).length && <hr/>}
                            </div>
                        ))}
                        {showCheckOutBtn()}
                    </div>
                    <div className={styles.cart_left}>
                        <div className={styles.cart_header}>
                            <h5 style={{textAlign: 'center'}}>Total Amount</h5>
                        </div>
                        <hr/>
                        <div className={styles.sub_total_info}>
                            <p>Subtotal</p>
                            <h4><span>$</span> {totalPrice.toLocaleString()}</h4>
                        </div>
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
    );
}

export default Cart;
