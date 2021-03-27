import React, {useState} from 'react';
import styles from './../../pages/cart/Cart.module.css'
import {useDispatch, useSelector} from "react-redux";
import {deleteCartItem} from "../../api";

function CartItem({product, incQty, decQty}) {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const {products} = useSelector(state => state.product)
    const [qty, setQty] = useState(product.units)

    const showImage = (images) => <img src={images[Math.floor(Math.random() * images?.length)]} alt={product.name}/>
    const truncate = (word, n) => {
        return word?.length > n ? `${word.substr(0, n - 1)}...` : word
    }

    const qtyIncrement = () => {
        setQty(qty + 1)
        incQty(product)
    }

    const qtyDecrement = () => {
        if (qty <= 1) return
        setQty(qty - 1)
        decQty(product)
    }

    const removeCartItem = () => dispatch(deleteCartItem(product.id, token))

    const showProductStatus = (product) => ((() => {
        const prod = products.find(p => p.id === product.id)
        return prod && prod.stock < 1 ? (
            <small className={styles.out_stock}>out of stock</small>
        ) : (
            <small className={styles.in_stock}>in stock</small>
        )
    })())

    return (
        <>
            <div className={styles.cart_item}>
                {showImage(product.images)}
                <div className={styles.prod_desc}>
                   <span className={styles.availability}>
                       <h4>{product.name}</h4>
                       {showProductStatus(product)}
                   </span>
                    <p>{truncate(product.description, 50)}</p>
                    <h5><small>Ksh.</small>{product.finalPrice.toFixed(2)}</h5>
                    <div className={styles.item_actions}>
                        <span>Wishlist</span>
                        <span onClick={() => removeCartItem()}>Remove</span>
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <span onClick={qtyDecrement}>-</span>
                <input readOnly value={qty}/>
                <span onClick={qtyIncrement}>+</span>
            </div>
        </>
    );
}

export default CartItem;