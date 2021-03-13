import React, {useState} from 'react';
import styles from './../../pages/Cart.module.css'

function CartItem({product, incQty, decQty}) {
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

    return (
        <>
            <div className={styles.cart_item}>
                {showImage(product.images)}
                <div className={styles.prod_desc}>
                    <h4>{product.name}</h4>
                    <p>{truncate(product.description, 50)}</p>
                    <h5><small>Ksh.</small>{product.finalPrice.toFixed(2)}</h5>
                    <div className={styles.item_actions}>
                        <span>Wishlist</span>
                        <span>Remove</span>
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