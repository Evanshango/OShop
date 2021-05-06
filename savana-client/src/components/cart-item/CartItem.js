import React, {useState} from 'react'
import styles from './../../pages/cart/Cart.module.css'
import {useDispatch, useSelector} from "react-redux"
import {deleteCartItem} from "../../api"
import {DeleteForeverOutlined} from "@material-ui/icons"
import {Badge} from "react-bootstrap"

function CartItem({product, incQty, decQty}) {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const {products} = useSelector(state => state.product)
    const [qty, setQty] = useState(product.units)

    const showImage = (images) => <img src={images[Math.floor(Math.random() * images?.length)]} alt={product.name}/>

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
            <Badge variant={'danger'} className={styles.badge}>out of stock</Badge>
        ) : (
            <Badge variant={'success'} className={styles.badge}>in stock</Badge>
        )
    })())

    console.log(product)

    return (
        <>
            <td className={styles.prod_image}>{showImage(product.images)}</td>
            <td className={styles.prod_name}>
                <div style={{display: "flex", flexDirection: 'column'}}>
                    {product.name}
                    {showProductStatus(product)}
                </div>
            </td>
            <td className={styles.price}>${product.finalPrice.toFixed(2)}</td>
            <td>
                <div className={styles.actions}>
                    <span className="btn btn-sm btn-outline-dark" onClick={qtyDecrement}>&#8722;</span>
                    <span>{qty}</span>
                    <span className="btn btn-sm btn-outline-success" onClick={qtyIncrement}>&#43;</span>
                </div>
            </td>
            <td className={styles.delete_btn}>
                <button className="btn btn-sm btn-outline-danger" onClick={() => removeCartItem()}>
                    <DeleteForeverOutlined/> Remove
                </button>
            </td>
        </>
        // <div className={styles.cart_item}>
        //     {showImage(product.images)}
        //     {/*<div className={styles.cart_item}>*/}
        //     {/*    {showImage(product.images)}*/}
        //     {/*    <div className={styles.prod_desc}>*/}
        //     {/*       <span className={styles.availability}>*/}
        //     {/*           <h5>{product.name}</h5>*/}
        //     {/*           {showProductStatus(product)}*/}
        //     {/*       </span>*/}
        //     {/*        <p>{truncate(product.description, 50)}</p>*/}
        //     {/*        <h6><small>$</small>{product.finalPrice.toFixed(2)}</h6>*/}
        //     {/*        <div className={styles.item_actions}>*/}
        //     {/*            <span>Wishlist</span>*/}
        //     {/*            <span onClick={() => removeCartItem()}>Remove</span>*/}
        //     {/*        </div>*/}
        //     {/*    </div>*/}
        //     {/*</div>*/}
        //     {/*<div className={styles.actions}>*/}
        //     {/*    <span onClick={qtyDecrement}>-</span>*/}
        //     {/*    <input readOnly value={qty}/>*/}
        //     {/*    <span onClick={qtyIncrement}>+</span>*/}
        //     {/*</div>*/}
        // </div>
    )
}

export default CartItem
